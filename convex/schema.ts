import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    documents: defineTable({
        userId: v.string(),
        title: v.string(),
        result: v.string(),
        summery: v.string(),
    })
})