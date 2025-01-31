const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require("./review");
const User = require("./user");

const validCategories = [
    "Trending", "Room", "Iconic Cities", "Mountains", 
    "Castles", "Amazing Pools", "Camping", "Farms",  
    "Arctic", "Domes", "Boats"
];

const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        url: String,
        filename: String
    },
    category: {
        type: String,
        enum: validCategories,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

listingSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        await Review.deleteMany({ _id: { $in: listing.reviews } });
    }
});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;
