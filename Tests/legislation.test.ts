import request from "supertest";
import app from "../app";
import * as admin from "firebase-admin";

jest.mock("firebase-admin", () => {
    const mockApps: any[] = [];
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


  const mockOnce = admin.database().ref().once as jest.Mock;

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
  
    request(app)
      .get("/api/legislationSummaries")
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveProperty("tenant-fees-act-2019");
        done();
      })
      .catch((err) => done(err));
  });
  test("GET /api/legislation/:id - Fetch specific summary", (done) => {
    (admin.database().ref().once as jest.Mock).mockResolvedValueOnce({
      exists: () => true,
      val: () => ({
        title: "Tenant Fees Act 2019",
        summary1: "This law is about...",
        summary2: "It regulates...",
        timestamp: 1736524657763,
      }),
    });
  
    request(app)
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

  test("GET /api/legislationSummaries/search?query=cars", (done) => {
    mockOnce.mockResolvedValueOnce({
      exists: () => true,
      val: () => ({
        "vehicle-laws-2021": {
          title: "Vehicle Laws 2021",
          summary1: "This law covers cars and other vehicles.",
          summary2: "Regulations for car usage and maintenance.",
          timestamp: 1736524657763,
        },
        "environment-protection-act": {
          title: "Environment Protection Act",
          summary1: "Regulates activities affecting the environment.",
          summary2: "Does not specifically mention cars.",
          timestamp: 1736524657763,
        },
      }),
    });
  request(app)
  .get("/api/legislationSummaries/search?query=cars")
  .expect(200)
  .then((res) => {
    expect(res.body).toHaveProperty("vehicle-laws-2021");
    expect(res.body["vehicle-laws-2021"]).toHaveProperty("title", "Vehicle Laws 2021");
    done();
  })
  .catch((err) => done(err));
  })
});
