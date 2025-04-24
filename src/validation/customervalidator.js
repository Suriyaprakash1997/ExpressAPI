const { z } = require("zod");

const customerSchema = z.object({
    CustomerName: z.string().nonempty("Customer name is required"),
    CompanyName: z.string().nonempty("Company name is required"),
    Email: z.string().email("Invalid email").nonempty("Email is required"),
});

module.exports = {
    customerSchema,
};