import { streamSSE } from 'hono/streaming'

export const removeAllFilesFromR2 = async (c) => {
let id = 0;
return streamSSE(c, async (stream) => {
    const files = await c.env.R2.list();
    const filesCount = files.objects.length;
    await stream.writeSSE({
        data: "Rozpoczynam usuwanie wszystkich plików z R2, jest ich: " + filesCount,
        event: 'START',
        id: String(id++),
    });
    
    if (filesCount > 0) {
        for (const file of files.objects) {
            await c.env.R2.delete(file.key);
            await stream.writeSSE({
                data: file.key,
                event: 'file-deleted',
                id: String(id++),
            });
        }
    }
    
    await stream.writeSSE({
        data: "Usunięto wszystkie pliki",
        event: 'END',
        id: String(id),
    });
});
}