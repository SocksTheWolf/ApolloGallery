import { addImageToIndywidualGallery } from '../../utils/db';

export const imageUploader = async (c) => {
  const galleryName = c.req.param("galeryTableName");
  const formData = await c.req.parseBody();
  const file = formData['file'];
  const width = formData['width'];
  const height = formData['height'];
  const hash = formData['hash'];
  const dateCreated = formData['dateCreated'];
  const dateModified = formData['dateModified'];

  if (!(file instanceof File)) {
    return c.text('Invalid file', 400);
  }

  // Check file size first
  if (file.size > 100 * 1024 * 1024) { // 100MB limit
    return c.json({
      'DB': {
        'success': false,
        'error': 'File too large. Maximum 100MB allowed.'
      }
    });
  }

  const fileBuffer = await file.arrayBuffer();
  const fullName = file.name;
  const ext = fullName.split('.').pop();
  const orgName = fullName.split('.').shift();
  const newName = orgName + "_" + hash.toString().slice(0, 10);
  const path = `galleries/${galleryName}/${newName}.${ext}`;

  try {
    // First, upload to R2
    const r2Response = await c.env.R2.put(path, fileBuffer);

    // Only if R2 upload succeeds, add to database
    const { success } = await addImageToIndywidualGallery(
      c,
      galleryName,
      orgName,
      width,
      height,
      hash,
      path,
      dateCreated,
      dateModified
    );

    if (!success) {
      // Rollback R2 upload if database insert fails
      await c.env.R2.delete(path);
      throw new Error("Database insert failed");
    }

    return c.json({
      'image': {
        'url': r2Response.key
      },
      'DB': {
        'success': true,
        'error': null
      }
    });
  } catch (error) {
    // Additional logging for debugging
    console.error('Upload error:', error);

    return c.json({
      'image': {
        'url': null
      },
      'DB': {
        'success': false,
        'error': error.message
      }
    });
  }
};
