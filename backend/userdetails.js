const mongoose = require("mongoose")


const userDetailsSchema = new mongoose.Schema(
    {
        names: String,
        email: {type: String, unique: true},
        password: String,
        birthday: Date,
        academic: String,
    },
    {
        collection: "info"
    }
)
mongoose.model("UserInfo", userDetailsSchema)

