/**
 * Frappe Backend API Helper
 * Replaces the Express.js backend (server/mail.js)
 *
 * All API calls go through: /api/method/fateh_website.enfono_api.<method>
 */

const FRAPPE_URL = import.meta.env.VITE_FRAPPE_URL ||
    (window.location.hostname === 'localhost' ? 'http://127.0.0.1:8000' : 'https://office.enfonoerp.com');

const BASE = `${FRAPPE_URL}/api/method/fateh_website.enfono_api`;

async function call(method, data = {}) {
    const res = await fetch(`${BASE}.${method}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "omit", // Skip CSRF for guest endpoints
        body: JSON.stringify(data),
    });
    const json = await res.json();
    if (json.exc) {
        console.error(`API error [${method}]:`, json.exc);
        throw new Error(json.exc_type || "API Error");
    }
    return json.message;
}

async function callGet(method, params = {}) {
    const query = new URLSearchParams(params).toString();
    const url = query ? `${BASE}.${method}?${query}` : `${BASE}.${method}`;
    const res = await fetch(url, {
        method: "GET",
        credentials: "omit",
    });
    const json = await res.json();
    if (json.exc) {
        console.error(`API error [${method}]:`, json.exc);
        throw new Error(json.exc_type || "API Error");
    }
    return json.message;
}

export const frappeApi = {
    // CMS Data
    getCmsData: (key = "enfono_cms_data") => call("get_cms", { key }),

    updateCmsData: (key, content) => call("update_cms", {
        key,
        content: typeof content === "string" ? content : JSON.stringify(content)
    }),

    // Leads
    submitLead: (data) => call("submit_lead", data),
    getLeads: () => call("get_leads"),

    // Chatbot
    chat: (messages, provider = "openai") => call("chat", {
        messages: JSON.stringify(messages),
        provider
    }),

    // Email
    sendEmail: (data) => call("send_email", data),

    // File Upload
    uploadFile: async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        const res = await fetch(`${BASE}.upload_file`, {
            method: "POST",
            credentials: "omit",
            body: formData,
        });
        const json = await res.json();
        return json.message;
    },

    // Media files
    getMediaFiles: () => call("get_cms", { key: "enfono_media_files" }),
    updateMediaFiles: (content) => call("update_cms", {
        key: "enfono_media_files",
        content: typeof content === "string" ? content : JSON.stringify(content)
    }),
};

export default frappeApi;
