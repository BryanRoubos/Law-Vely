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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const admin = __importStar(require("firebase-admin"));
jest.mock("firebase-admin", () => {
    const mockApps = [];
    const mockDatabase = {
        ref: jest.fn().mockReturnThis(),
        once: jest.fn(),
    };
    return {
        apps: mockApps,
        initializeApp: jest.fn(() => {
            mockApps.push({});
        }),
        credential: {
            cert: jest.fn(),
        },
        database: jest.fn(() => mockDatabase),
    };
});
describe("Legislation API Tests", () => {
    const mockOnce = admin.database().ref().once;
    afterEach(() => {
        jest.clearAllMocks();
    });
    test("GET /api/legislation - Fetch all summaries", (done) => {
        mockOnce.mockResolvedValueOnce({
            exists: () => true,
            val: () => ({
                "tenant-fees-act-2019": {
                    title: "Tenant Fees Act 2019",
                    summary1: "This law is about...",
                    summary2: "It regulates...",
                    timestamp: 1736524657763,
                },
            }),
        });
        (0, supertest_1.default)(app_1.default)
            .get("/api/legislationSummaries")
            .expect(200)
            .then((res) => {
            expect(res.body).toHaveProperty("tenant-fees-act-2019");
            done();
        })
            .catch((err) => done(err));
    });
    test("GET /api/legislation/:id - Fetch specific summary", (done) => {
        admin.database().ref().once.mockResolvedValueOnce({
            exists: () => true,
            val: () => ({
                title: "Tenant Fees Act 2019",
                summary1: "This law is about...",
                summary2: "It regulates...",
                timestamp: 1736524657763,
            }),
        });
        (0, supertest_1.default)(app_1.default)
            .get("/api/legislationSummaries/tenant-fees-act-2019")
            .expect(200)
            .then((res) => {
            expect(res.body).toHaveProperty("title", "Tenant Fees Act 2019");
            expect(res.body).toHaveProperty("summary1", "This law is about...");
            expect(res.body).toHaveProperty("summary2", "It regulates...");
            done();
        })
            .catch((err) => done(err));
    });
});
