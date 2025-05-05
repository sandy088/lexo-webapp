import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createDocuments = mutation({
  args: {
    userId: v.string(),
    title: v.string(),
    result: v.string(),
    summery: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    if (!identity?.email) {
      throw new Error("User ID not found");
    }
    const { title, result, summery } = args;

    const document = await ctx.db.insert("documents", {
      userId: identity.email,
      title,
      result,
      summery,
    });

    return document;
  },
});

export const getDocumentsByUserId = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    if (!identity?.email) {
      throw new Error("User ID not found");
    }
    const documents = await ctx.db
      .query("documents")
      .filter((q) => q.eq(q.field("userId"), identity.email))
      .collect();
    return documents;
  },
});

export const getDocumentByDocumentId = query({
  args: {
    documentId: v.id("documents"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    if (!identity?.email) {
      throw new Error("User ID not found");
    }
    const document = await ctx.db.get(args.documentId);
    return document;
  },
});
