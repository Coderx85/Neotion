import { v } from 'convex/values';

import { mutation, query } from './_generated/server';
import { Doc, Id } from './_generated/dataModel';

export const archive = mutation({
  args: { id: v.id('documents') },
  handler: async (context, args) => {
    const identity = await context.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Not authenticated');
    }

    const userId = identity.subject;

    const existingDocument = await context.db.get(args.id);

    if (!existingDocument) {
      throw new Error('Not found');
    }

    if (existingDocument.userId !== userId) {
      throw new Error('Unauthorized');
    }

    const recursiveArchive = async (documentId: Id<'documents'>) => {
      const children = await context.db
        .query('documents')
        .withIndex('by_user_parent', (q) =>
          q.eq('userId', userId).eq('parentDocument', documentId)
        )
        .collect();

      for (const child of children) {
        await context.db.patch(child._id, {
          isArchived: true,
        });
        await recursiveArchive(child._id);
      }
    };

    const document = await context.db.patch(args.id, {
      isArchived: true,
    });

    recursiveArchive(args.id);

    return document;
  },
});

export const getSidebar = query({
  args: {
    parentDocument: v.optional(v.id('documents')),
  },
  handler: async (context, args) => {
    const identity = await context.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Not authenticated');
    }

    const userId = identity.subject;

    const documents = await context.db
      .query('documents')
      .withIndex('by_user_parent', (q) =>
        q.eq('userId', userId).eq('parentDocument', args.parentDocument)
      )
      .filter((q) => q.eq(q.field('isArchived'), false))
      .order('desc')
      .collect();

    return documents;
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    parentDocument: v.optional(v.id('documents')),
  },
  handler: async (context, args) => {
    const identity = await context.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Not authenticated');
    }

    const userId = identity.subject;

    const document = await context.db.insert('documents', {
      title: args.title,
      parentDocument: args.parentDocument,
      userId,
      isArchived: false,
      isPublished: false,
      isStar: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return document;
  },
});

export const star = mutation({
  args: { id: v.id('documents') },
  handler: async (context, args) => {
    const identity = await context.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Not authenticated');
    }

    const userId = identity.subject;

    const existingDocument = await context.db.get(args.id);

    if (!existingDocument) {
      throw new Error('Not found');
    }

    if (existingDocument.userId !== userId) {
      throw new Error('Unauthorized');
    }

    const document = await context.db.patch(args.id, {
      isStar: !existingDocument.isStar,
    });

    return document;
  },
});

export const getStarred = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Not authenticated');
    }

    const userId = identity.subject;

    const documents = await ctx.db
      .query('documents')
      .withIndex('by_user', (q) => q.eq('userId', userId))
      .filter((q) => q.eq(q.field('isStar'), true))
      .order('desc')
      .collect();

    return documents;
  },
});

export const getTrash = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Not authenticated');
    }

    const userId = identity.subject;

    const documents = await ctx.db
      .query('documents')
      .withIndex('by_user', (q) => q.eq('userId', userId))
      .filter((q) => q.eq(q.field('isArchived'), true))
      .order('desc')
      .collect();

    return documents;
  },
});

export const restore = mutation({
  args: { id: v.id('documents') },
  handler: async (context, args) => {
    const identity = await context.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Not authenticated');
    }

    const userId = identity.subject;

    const existingDocument = await context.db.get(args.id);

    if (!existingDocument) {
      throw new Error('Not found');
    }

    if (existingDocument.userId !== userId) {
      throw new Error('Unauthorized');
    }

    const recursiveRestore = async (documentId: Id<'documents'>) => {
      const children = await context.db
        .query('documents')
        .withIndex('by_user_parent', (q) =>
          q.eq('userId', userId).eq('parentDocument', documentId)
        )
        .collect();

      for (const child of children) {
        await context.db.patch(child._id, {
          isArchived: false,
        });

        await recursiveRestore(child._id);
      }
    };

    const options: Partial<Doc<'documents'>> = {
      isArchived: false,
    };

    if (existingDocument.parentDocument) {
      const parent = await context.db.get(existingDocument.parentDocument);
      if (parent?.isArchived) {
        options.parentDocument = undefined;
      }
    }

    const document = await context.db.patch(args.id, options);

    recursiveRestore(args.id);

    return document;
  },
});

export const remove = mutation({
  args: { id: v.id('documents') },
  handler: async (context, args) => {
    const identity = await context.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Not authenticated');
    }

    const userId = identity.subject;

    const existingDocument = await context.db.get(args.id);

    if (!existingDocument) {
      throw new Error('Not found');
    }

    if (existingDocument.userId !== userId) {
      throw new Error('Unauthorized');
    }

    const document = await context.db.delete(args.id);

    return document;
  },
});

export const getSearch = query({
  handler: async (context) => {
    const identity = await context.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Not authenticated');
    }

    const userId = identity.subject;

    const documents = await context.db
      .query('documents')
      .withIndex('by_user', (q) => q.eq('userId', userId))
      .filter((q) => q.eq(q.field('isArchived'), false))
      .order('desc')
      .collect();

    // Fetch parent document titles for documents that have parents
    const documentsWithParentTitles = await Promise.all(
      documents.map(async (doc) => {
        if (doc.parentDocument) {
          const parentDoc = await context.db.get(doc.parentDocument);
          return {
            ...doc,
            parentTitle: parentDoc?.title || null,
          };
        }
        return {
          ...doc,
          parentTitle: null,
        };
      })
    );

    return documentsWithParentTitles;
  },
});

export const getById = query({
  args: { documentId: v.id('documents') },
  handler: async (context, args) => {
    const identity = await context.auth.getUserIdentity();

    const document = await context.db.get(args.documentId);

    if (!document) {
      throw new Error('Not found');
    }

    if (document.isPublished && !document.isArchived) {
      return document;
    }

    if (!identity) {
      throw new Error('Not authenticated');
    }

    const userId = identity.subject;

    if (document.userId !== userId) {
      throw new Error('Unauthorized');
    }

    return document;
  },
});

export const getByIdWithParent = query({
  args: { documentId: v.id('documents') },
  handler: async (context, args) => {
    const identity = await context.auth.getUserIdentity();

    const document = await context.db.get(args.documentId);

    if (!document) {
      throw new Error('Not found');
    }

    if (document.isPublished && !document.isArchived) {
      // Fetch parent document if exists
      if (document.parentDocument) {
        const parentDoc = await context.db.get(document.parentDocument);
        return {
          ...document,
          parentTitle: parentDoc?.title || null,
        };
      }
      return {
        ...document,
        parentTitle: null,
      };
    }

    if (!identity) {
      throw new Error('Not authenticated');
    }

    const userId = identity.subject;

    if (document.userId !== userId) {
      throw new Error('Unauthorized');
    }

    // Fetch parent document if exists
    if (document.parentDocument) {
      const parentDoc = await context.db.get(document.parentDocument);
      return {
        ...document,
        parentTitle: parentDoc?.title || null,
      };
    }

    return {
      ...document,
      parentTitle: null,
    };
  },
});

export const update = mutation({
  args: {
    id: v.id('documents'),
    title: v.optional(v.string()),
    content: v.optional(v.string()),
    coverImage: v.optional(v.string()),
    icon: v.optional(v.string()),
    isPublished: v.optional(v.boolean()),
  },
  handler: async (context, args) => {
    const identity = await context.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Unauthenticated');
    }

    const userId = identity.subject;

    const { ...rest } = args;

    const existingDocument = await context.db.get(args.id);

    if (!existingDocument) {
      throw new Error('Not found');
    }

    if (existingDocument.userId !== userId) {
      throw new Error('Unauthorized');
    }

    const document = await context.db.patch(args.id, {
      ...rest,
      updatedAt: Date.now(),
    });

    return document;
  },
});

export const updateTitle = mutation({
  args: {
    id: v.id('documents'),
    title: v.string(),
  },
  handler: async (context, args) => {
    const identity = await context.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Unauthenticated');
    }

    const userId = identity.subject;

    const existingDocument = await context.db.get(args.id);

    if (!existingDocument) {
      throw new Error('Not found');
    }

    if (existingDocument.userId !== userId) {
      throw new Error('Unauthorized');
    }

    const document = await context.db.patch(args.id, {
      title: args.title,
    });

    return document;
  },
});

export const removeIcon = mutation({
  args: { id: v.id('documents') },
  handler: async (context, args) => {
    const identity = await context.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Unauthenticated');
    }

    const userId = identity.subject;

    const existingDocument = await context.db.get(args.id);

    if (!existingDocument) {
      throw new Error('Not found');
    }

    if (existingDocument.userId !== userId) {
      throw new Error('Unauthorized');
    }

    const document = await context.db.patch(args.id, {
      icon: undefined,
    });

    return document;
  },
});

export const removeCoverImage = mutation({
  args: { id: v.id('documents') },
  handler: async (context, args) => {
    const identity = await context.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Unauthenticated');
    }

    const userId = identity.subject;

    const existingDocument = await context.db.get(args.id);

    if (!existingDocument) {
      throw new Error('Not found');
    }

    if (existingDocument.userId !== userId) {
      throw new Error('Unauthorized');
    }

    const document = await context.db.patch(args.id, {
      coverImage: undefined,
    });

    return document;
  },
});

export const searchByParentTitle = query({
  args: { searchTerm: v.string() },
  handler: async (context, args) => {
    const identity = await context.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Not authenticated');
    }

    const userId = identity.subject;

    // Get all non-archived documents
    const documents = await context.db
      .query('documents')
      .withIndex('by_user', (q) => q.eq('userId', userId))
      .filter((q) => q.eq(q.field('isArchived'), false))
      .collect();

    // Filter documents that match search criteria
    const matchingDocuments = [];

    for (const doc of documents) {
      let matches = false;

      // Check if document title matches
      if (doc.title.toLowerCase().includes(args.searchTerm.toLowerCase())) {
        matches = true;
      }

      // Check if parent document title matches
      if (!matches && doc.parentDocument) {
        const parentDoc = await context.db.get(doc.parentDocument);
        if (
          parentDoc &&
          parentDoc.title.toLowerCase().includes(args.searchTerm.toLowerCase())
        ) {
          matches = true;
        }
      }

      if (matches) {
        // Get parent title for result
        let parentTitle = null;
        if (doc.parentDocument) {
          const parentDoc = await context.db.get(doc.parentDocument);
          parentTitle = parentDoc?.title || null;
        }
        matchingDocuments.push({
          ...doc,
          parentTitle,
        });
      }
    }
    return matchingDocuments;
  },
});
