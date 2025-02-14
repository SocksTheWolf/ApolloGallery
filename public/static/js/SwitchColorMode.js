/*!
 * Minimal theme switcher using a checkbox
 *
 * Pico.css - https://picocss.com
 * Copyright 2019-2025 - Licensed under MIT
 * Modified by Yohn https://github.com/Yohn/PicoCSS
 */

const SwitchColorMode = {
	// Config
	_scheme: "auto",
	rootAttribute: "data-theme",
	localStorageKey: "picoPreferredColorScheme",

	// Init
	init(containerId) {
		// Create and insert the checkbox
		const container = document.getElementById(containerId);
		if (!container) {
			console.error(`Container with id '${containerId}' not found`);
			return;
		}

		// Create the checkbox element
		const checkbox = document.createElement('input');
		checkbox.setAttribute('name', 'color-mode-toggle');
		checkbox.setAttribute('role', 'switch');
		checkbox.setAttribute('type', 'checkbox');
		checkbox.setAttribute('value', '1');

		// Insert the checkbox into the container
		container.appendChild(checkbox);

		this.checkbox = checkbox;

		// If first visit, use the theme from <html> attribute; otherwise, use stored preference
		this.scheme = this.schemeFromLocalStorage ?? this.schemeFromHTML;

		// Set checkbox state based on the applied theme
		this.checkbox.checked = this.scheme === "dark";

		// Listen for user changes
		this.checkbox.addEventListener("change", () => {
			this.scheme = this.checkbox.checked ? "dark" : "light";
			this.schemeToLocalStorage();
		});

		// Listen for system color scheme changes
		if (this.scheme === "auto") {
			window.matchMedia("(prefers-color-scheme: dark)")
				.addEventListener("change", (e) => {
					this.scheme = "auto";
				});
		}
	},

	// Get color scheme from local storage
	get schemeFromLocalStorage() {
		return window.localStorage?.getItem(this.localStorageKey);
	},

	// Get the default theme from the <html> attribute
	get schemeFromHTML() {
		return document.documentElement.getAttribute(this.rootAttribute) ?? "auto";
	},

	// Preferred color scheme from system
	get preferredColorScheme() {
		return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
	},

	// Set scheme
	set scheme(scheme) {
		if (scheme === "auto") {
			this._scheme = this.preferredColorScheme;
		} else if (scheme === "dark" || scheme === "light") {
			this._scheme = scheme;
		}
		this.applyScheme();
	},

	// Get scheme
	get scheme() {
		return this._scheme;
	},

	// Apply scheme
	applyScheme() {
		document.documentElement.setAttribute(this.rootAttribute, this._scheme);
	},

	// Store scheme to local storage
	schemeToLocalStorage() {
		window.localStorage?.setItem(this.localStorageKey, this.scheme);
	},
};

// Initialize with container ID
SwitchColorMode.init('theme-switcher');