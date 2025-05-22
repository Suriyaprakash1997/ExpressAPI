const { getPagination } = require("../controllers/accountYearController");
const AccountYear = require("../models/accountYearModel");

jest.mock("../models/accountYearModel");
jest.setTimeout(10000);

describe("accountYear controller - getPagination", () => {
    beforeEach(() => {
        jest.clearAllMocks();
      });
      it("should return paginated account year details", async () => {
        const req = {
          query: {
            PageIndex: "1",
            PageSize: "10",
            SortCol: "AccountYear",
            SortOrder: "desc",
            SearchString: ""
          }
        };
    
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn()
        };
    
        const mockData = [
          {
            _id: "1",
            AccountYear: "2023",
            StartDate: new Date("2023-01-01"),
            EndDate: new Date("2023-12-31")
          },
          {
            _id: "2",
            AccountYear: "2024",
            StartDate: new Date("2024-01-01"),
            EndDate: new Date("2024-12-31")
          }
        ];
    
        // Mock the query chain
        const selectMock = jest.fn().mockReturnThis();
        const sortMock = jest.fn().mockReturnThis();
        const skipMock = jest.fn().mockReturnThis();
        const limitMock = jest.fn().mockResolvedValue(mockData);
    
        AccountYear.find.mockImplementation(() => ({
          select: selectMock,
          sort: sortMock,
          skip: skipMock,
          limit: limitMock
        }));
    
        AccountYear.countDocuments.mockResolvedValue(50);
    
        await getPagination(req, res);
    
        expect(res.json).toHaveBeenCalledWith({
          total: 50,
          page: 1,
          limit: 10,
          totalPages: 5,
          data: [
            {
              id: "1",
              accountyear: "2023",
              startdate: expect.any(String),
              enddate: expect.any(String)
            },
            {
              id: "2",
              accountyear: "2024",
              startdate: expect.any(String),
              enddate: expect.any(String)
            }
          ]
        });
    
        // Ensure the query chain methods were called in the correct order
        expect(AccountYear.find).toHaveBeenCalledWith({ IsDelete: { $ne: 1 } });
        expect(selectMock).toHaveBeenCalledWith({ AccountYear: 1, StartDate: 1, EndDate: 1, _id: 1 });
        expect(sortMock).toHaveBeenCalledWith({ AccountYear: -1 });
        expect(skipMock).toHaveBeenCalledWith(0);
        expect(limitMock).toHaveBeenCalledWith(10);
      });


  it("should handle database error", async () => {
    const req = { query: { PageIndex: "1", PageSize: "10" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    const errorMessage = "Database Error";
    
    // Mock the behavior of find() to throw an error
    AccountYear.find.mockImplementation(() => {
      throw new Error(errorMessage);
    });

    try {
      await getPagination(req, res);
    } catch (error) {
      expect(error.message).toBe(errorMessage);
    }
  });
});
