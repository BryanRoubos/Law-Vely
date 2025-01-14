"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
const serviceAccountKey_json_1 = __importDefault(require("../../serviceAccountKey.json"));
const admin = __importStar(require("firebase-admin"));
dotenv_1.default.config();
admin.initializeApp({
    credential: admin.credential.cert(serviceAccountKey_json_1.default),
    databaseURL: "https://law-vely-default-rtdb.europe-west1.firebasedatabase.app/",
});
const db = admin.database();
const OPENAI_API_KEY = process.env.BENS_OPENAI_API_KEY;
async function summarizeLegislation(legislationUrl) {
    try {
        const legislationResponse = await axios_1.default.get(legislationUrl, {
            headers: { "Content-Type": "text/plain" },
        });
        const legislationText = legislationResponse.data;
        const titleResponse = await axios_1.default.post("https://api.openai.com/v1/chat/completions", {
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "Extract the title of the following legislation text.",
                },
                {
                    role: "user",
                    content: legislationText,
                },
            ],
            max_tokens: 50,
            temperature: 0.7,
        }, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${OPENAI_API_KEY}`,
            },
        });
        const legislationTitle = titleResponse.data.choices[0].message.content.trim();
        const payloads = [
            {
                messages: [
                    {
                        role: "system",
                        content: "Begin the summary with `This law is about...`. You are an assistant that explains the legal texts concisely in a summary, and in layman's terms.",
                    },
                    {
                        role: "user",
                        content: `Summarize and explain the following legal text concisely:\n\n${legislationText}`,
                    },
                ],
            },
            {
                messages: [
                    {
                        role: "system",
                        content: "Explain each sub-section of the act in a step-by-step manner, starting with `This law is about...`. Make it simple and easy to understand.",
                    },
                    {
                        role: "user",
                        content: `Summarize and explain the following legal text concisely:\n\n${legislationText}`,
                    },
                ],
            },
        ];
        const results = await Promise.all(payloads.map((payload) => axios_1.default.post("https://api.openai.com/v1/chat/completions", {
            model: "gpt-3.5-turbo",
            messages: payload.messages,
            max_tokens: 400,
            temperature: 0.7,
        }, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${OPENAI_API_KEY}`,
            },
        })));
        const summary1 = results[0].data.choices[0].message.content.trim();
        const summary2 = results[1].data.choices[0].message.content.trim();
        const documentName = legislationTitle.replace(/\W+/g, "-").toLowerCase();
        await db.ref(`legislationSummaries/${documentName}`).set({
            title: legislationTitle,
            summary1,
            summary2,
            timestamp: admin.database.ServerValue.TIMESTAMP,
        });
        console.log("Stored summary:", summary1, summary2);
    }
    catch (error) {
        console.error("Error processing legislation:", error);
    }
}
const legislationUrlAnimals = "https://www.legislation.gov.uk/ukpga/Geo6/14-15/35/contents";
const legislationUrlTenants = "https://www.legislation.gov.uk/ukpga/2019/4/contents";
const legislationUrlRoadTraffic = "https://www.legislation.gov.uk/uksi/1992/3013/made/data.xht?view=snippet&wrap=true";
summarizeLegislation(legislationUrlRoadTraffic);
