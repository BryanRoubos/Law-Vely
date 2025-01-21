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

  test('should return filtered legislation based on multiple categories', async () => {
    const mockData = {
      'antarctic-act-2013': {
        id: 'antarctic-act-2013',
        title: 'Antarctic Act 2013',
        categories: ['Environment', 'Governance'],
        summaryOfLegislation: 'The Antarctic Act 2013 relates to...',
        summaryOfSubSections: 'Subsections...',
        timestamp: 1737374652741,
        url: 'https://www.legislation.gov.uk/ukpga/2013/15/data.xht?view=snippet&wrap=true',
      },
      'housing-act-2024': {
        id: 'housing-act-2024',
        title: 'Housing Act 2024',
        categories: ['Housing'],
        summaryOfLegislation: 'Legislation about housing',
        summaryOfSubSections: 'Subsections...',
        timestamp: 1678900010,
        url: 'https://www.legislation.gov.uk/ukpga/2024/20/data.xht?view=snippet&wrap=true',
      },
    };
    mockOnce.mockResolvedValueOnce({
      exists: () => true,
      val: () => mockData,
    });

    const response = await request(app).get('/api/legislationSummaries?category=Environment&category=Housing');

    expect(response.status).toBe(200);

    expect(response.body).toHaveProperty('antarctic-act-2013');
    expect(response.body['antarctic-act-2013']).toHaveProperty('title', 'Antarctic Act 2013');
    expect(response.body['antarctic-act-2013'].categories).toEqual(['Environment', 'Governance']);

    expect(response.body).toHaveProperty('housing-act-2024');
    expect(response.body['housing-act-2024']).toHaveProperty('title', 'Housing Act 2024');
    expect(response.body['housing-act-2024'].categories).toEqual(['Housing']);
  });

});
