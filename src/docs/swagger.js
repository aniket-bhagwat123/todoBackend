const bearerSecurity = [{ bearerAuth: [] }];

const jsonContent = (schemaRef) => ({
  'application/json': {
    schema: {
      $ref: schemaRef,
    },
  },
});

const response = (description, schemaRef) => ({
  description,
  content: jsonContent(schemaRef),
});

const errorResponse = (description) => ({
  description,
  content: jsonContent('#/components/schemas/ErrorResponse'),
});

const idPathParameter = {
  in: 'path',
  name: 'id',
  required: true,
  schema: {
    $ref: '#/components/schemas/MongoId',
  },
};

const swaggerSpec = {
  openapi: '3.0.3',
  info: {
    title: 'Todo Backend API',
    version: '1.0.0',
    description: 'OpenAPI documentation for the Todo backend APIs.',
  },
  servers: [
    {
      url: '/api',
      description: 'Current API server',
    },
  ],
  tags: [
    { name: 'Auth', description: 'Authentication endpoints' },
    { name: 'Users', description: 'User management endpoints' },
    { name: 'Boards', description: 'Board management endpoints' },
    { name: 'Cards', description: 'Card management endpoints' },
    { name: 'Comments', description: 'Comment management endpoints' },
    { name: 'Uploads', description: 'File upload endpoints' },
  ],
  paths: {
    '/auth/login': {
      post: {
        tags: ['Auth'],
        summary: 'Login a user',
        requestBody: {
          required: true,
          content: jsonContent('#/components/schemas/LoginRequest'),
        },
        responses: {
          200: response('Login successful', '#/components/schemas/AuthResponse'),
          401: errorResponse('Invalid credentials'),
          500: errorResponse('Login failed'),
        },
      },
    },
    '/auth/signup': {
      post: {
        tags: ['Auth'],
        summary: 'Register a new user',
        requestBody: {
          required: true,
          content: jsonContent('#/components/schemas/UserSignupRequest'),
        },
        responses: {
          201: response('User registered successfully', '#/components/schemas/RegisterResponse'),
          400: errorResponse('Validation or registration error'),
        },
      },
    },
    '/users': {
      get: {
        tags: ['Users'],
        summary: 'Get users',
        security: bearerSecurity,
        parameters: [
          { in: 'query', name: 'email', schema: { type: 'string' } },
          { in: 'query', name: 'name', schema: { type: 'string' } },
          { in: 'query', name: 'isActive', schema: { type: 'boolean' } },
          { in: 'query', name: 'page', schema: { type: 'integer', minimum: 1 } },
          { in: 'query', name: 'limit', schema: { type: 'integer', minimum: 1 } },
        ],
        responses: {
          200: response('Users fetched successfully', '#/components/schemas/UserListResponse'),
          401: errorResponse('Unauthorized'),
          404: response('No users found', '#/components/schemas/UserListResponse'),
        },
      },
    },
    '/users/get-user/{id}': {
      get: {
        tags: ['Users'],
        summary: 'Get a user by ID',
        security: bearerSecurity,
        parameters: [idPathParameter],
        responses: {
          200: response('User fetched successfully', '#/components/schemas/UserResponse'),
          401: errorResponse('Unauthorized'),
          404: errorResponse('User not found'),
        },
      },
    },
    '/users/update-user': {
      patch: {
        tags: ['Users'],
        summary: 'Update a user',
        security: bearerSecurity,
        requestBody: {
          required: true,
          content: jsonContent('#/components/schemas/UserUpdateRequest'),
        },
        responses: {
          200: response('User updated successfully', '#/components/schemas/UserResponse'),
          400: errorResponse('Invalid update payload'),
          401: errorResponse('Unauthorized'),
        },
      },
    },
    '/users/delete-user/{id}': {
      delete: {
        tags: ['Users'],
        summary: 'Soft delete a user',
        security: bearerSecurity,
        parameters: [idPathParameter],
        responses: {
          200: response('User deleted successfully', '#/components/schemas/DeleteResponse'),
          401: errorResponse('Unauthorized'),
          404: errorResponse('User not found'),
        },
      },
    },
    '/boards': {
      get: {
        tags: ['Boards'],
        summary: 'Get boards',
        security: bearerSecurity,
        parameters: [
          { in: 'query', name: 'search', schema: { type: 'string' } },
          { in: 'query', name: 'isActive', schema: { type: 'boolean' } },
          { in: 'query', name: 'page', schema: { type: 'integer', minimum: 1 } },
          { in: 'query', name: 'limit', schema: { type: 'integer', minimum: 1 } },
        ],
        responses: {
          200: response('Boards fetched successfully', '#/components/schemas/BoardListResponse'),
          401: errorResponse('Unauthorized'),
          404: response('No boards found', '#/components/schemas/BoardListResponse'),
        },
      },
    },
    '/boards/create-board': {
      post: {
        tags: ['Boards'],
        summary: 'Create a board',
        security: bearerSecurity,
        requestBody: {
          required: true,
          content: jsonContent('#/components/schemas/BoardCreateRequest'),
        },
        responses: {
          201: response('Board created successfully', '#/components/schemas/BoardResponse'),
          401: errorResponse('Unauthorized'),
          500: errorResponse('Failed to create board'),
        },
      },
    },
    '/boards/update-board': {
      patch: {
        tags: ['Boards'],
        summary: 'Update a board',
        security: bearerSecurity,
        requestBody: {
          required: true,
          content: jsonContent('#/components/schemas/BoardUpdateRequest'),
        },
        responses: {
          200: response('Board updated successfully', '#/components/schemas/BoardResponse'),
          401: errorResponse('Unauthorized'),
          500: errorResponse('Failed to update board'),
        },
      },
    },
    '/boards/{id}': {
      get: {
        tags: ['Boards'],
        summary: 'Get a board by ID',
        security: bearerSecurity,
        parameters: [idPathParameter],
        responses: {
          200: response('Board fetched successfully', '#/components/schemas/BoardResponse'),
          401: errorResponse('Unauthorized'),
          404: errorResponse('Board not found'),
        },
      },
      delete: {
        tags: ['Boards'],
        summary: 'Soft delete a board',
        security: bearerSecurity,
        parameters: [idPathParameter],
        responses: {
          200: response('Board deleted successfully', '#/components/schemas/DeleteResponse'),
          401: errorResponse('Unauthorized'),
          404: errorResponse('Board not found'),
        },
      },
    },
    '/cards': {
      get: {
        tags: ['Cards'],
        summary: 'Get cards',
        security: bearerSecurity,
        parameters: [
          { in: 'query', name: 'board_id', schema: { $ref: '#/components/schemas/MongoId' } },
          { in: 'query', name: 'search', schema: { type: 'string' } },
          { in: 'query', name: 'isActive', schema: { type: 'boolean' } },
          { in: 'query', name: 'page', schema: { type: 'integer', minimum: 1 } },
          { in: 'query', name: 'limit', schema: { type: 'integer', minimum: 1 } },
        ],
        responses: {
          200: response('Cards fetched successfully', '#/components/schemas/CardListResponse'),
          401: errorResponse('Unauthorized'),
          404: response('No cards found', '#/components/schemas/CardListResponse'),
        },
      },
    },
    '/cards/create-card': {
      post: {
        tags: ['Cards'],
        summary: 'Create a card',
        security: bearerSecurity,
        requestBody: {
          required: true,
          content: jsonContent('#/components/schemas/CardCreateRequest'),
        },
        responses: {
          201: response('Card created successfully', '#/components/schemas/CardResponse'),
          401: errorResponse('Unauthorized'),
          500: errorResponse('Failed to create card'),
        },
      },
    },
    '/cards/update-card': {
      patch: {
        tags: ['Cards'],
        summary: 'Update a card',
        security: bearerSecurity,
        requestBody: {
          required: true,
          content: jsonContent('#/components/schemas/CardUpdateRequest'),
        },
        responses: {
          200: response('Card updated successfully', '#/components/schemas/CardResponse'),
          401: errorResponse('Unauthorized'),
          500: errorResponse('Failed to update card'),
        },
      },
    },
    '/cards/{id}': {
      get: {
        tags: ['Cards'],
        summary: 'Get a card by ID',
        security: bearerSecurity,
        parameters: [idPathParameter],
        responses: {
          200: response('Card fetched successfully', '#/components/schemas/CardResponse'),
          401: errorResponse('Unauthorized'),
          404: errorResponse('Card not found'),
        },
      },
      delete: {
        tags: ['Cards'],
        summary: 'Soft delete a card',
        security: bearerSecurity,
        parameters: [idPathParameter],
        responses: {
          200: response('Card deleted successfully', '#/components/schemas/CardResponse'),
          401: errorResponse('Unauthorized'),
          404: errorResponse('Card not found'),
        },
      },
    },
    '/comments': {
      get: {
        tags: ['Comments'],
        summary: 'Get comments',
        security: bearerSecurity,
        parameters: [
          { in: 'query', name: 'card_id', schema: { $ref: '#/components/schemas/MongoId' } },
          { in: 'query', name: 'page', schema: { type: 'integer', minimum: 1 } },
          { in: 'query', name: 'limit', schema: { type: 'integer', minimum: 1 } },
        ],
        responses: {
          200: response('Comments fetched successfully', '#/components/schemas/CommentListResponse'),
          401: errorResponse('Unauthorized'),
          404: response('No comments found', '#/components/schemas/CommentListResponse'),
        },
      },
    },
    '/comments/comments/{id}': {
      get: {
        tags: ['Comments'],
        summary: 'Get a comment by ID',
        description: 'This path matches the current routing configuration.',
        security: bearerSecurity,
        parameters: [idPathParameter],
        responses: {
          200: response('Comment fetched successfully', '#/components/schemas/CommentResponse'),
          401: errorResponse('Unauthorized'),
          404: errorResponse('Comment not found'),
          500: errorResponse('Current implementation may return an internal error for this route'),
        },
      },
    },
    '/comments/create-comment': {
      post: {
        tags: ['Comments'],
        summary: 'Create a comment',
        security: bearerSecurity,
        requestBody: {
          required: true,
          content: jsonContent('#/components/schemas/CommentCreateRequest'),
        },
        responses: {
          200: response('Comment created successfully', '#/components/schemas/CommentResponse'),
          401: errorResponse('Unauthorized'),
          500: errorResponse('Failed to create comment'),
        },
      },
    },
    '/comments/update-comment/{id}': {
      patch: {
        tags: ['Comments'],
        summary: 'Update a comment',
        security: bearerSecurity,
        parameters: [idPathParameter],
        requestBody: {
          required: true,
          content: jsonContent('#/components/schemas/CommentUpdateRequest'),
        },
        responses: {
          200: response('Comment updated successfully', '#/components/schemas/CommentResponse'),
          401: errorResponse('Unauthorized'),
          404: errorResponse('Comment not found'),
          500: errorResponse('Failed to update comment'),
        },
      },
    },
    '/comments/delete-comment/{id}': {
      delete: {
        tags: ['Comments'],
        summary: 'Soft delete a comment',
        security: bearerSecurity,
        parameters: [idPathParameter],
        responses: {
          200: response('Comment deleted successfully', '#/components/schemas/CommentResponse'),
          401: errorResponse('Unauthorized'),
          404: errorResponse('Comment not found'),
        },
      },
    },
    '/upload/getAll': {
      get: {
        tags: ['Uploads'],
        summary: 'Get uploaded files',
        description: 'Returns uploaded file records. The current implementation ignores query filters.',
        security: bearerSecurity,
        responses: {
          200: response('Files retrieved successfully', '#/components/schemas/FileListResponse'),
          401: errorResponse('Unauthorized'),
        },
      },
    },
    '/upload/single': {
      post: {
        tags: ['Uploads'],
        summary: 'Upload a single file',
        security: bearerSecurity,
        requestBody: {
          required: true,
          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',
                required: ['file'],
                properties: {
                  file: {
                    type: 'string',
                    format: 'binary',
                  },
                },
              },
            },
          },
        },
        responses: {
          201: response('File uploaded successfully', '#/components/schemas/FileResponse'),
          401: errorResponse('Unauthorized'),
        },
      },
    },
    '/upload/multiple': {
      post: {
        tags: ['Uploads'],
        summary: 'Upload multiple files',
        security: bearerSecurity,
        requestBody: {
          required: true,
          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',
                required: ['files'],
                properties: {
                  files: {
                    type: 'array',
                    items: {
                      type: 'string',
                      format: 'binary',
                    },
                  },
                },
              },
            },
          },
        },
        responses: {
          201: response('Files uploaded successfully', '#/components/schemas/MultipleFilesResponse'),
          401: errorResponse('Unauthorized'),
        },
      },
    },
    '/upload/get/{id}': {
      get: {
        tags: ['Uploads'],
        summary: 'Get uploaded file details by ID',
        security: bearerSecurity,
        parameters: [idPathParameter],
        responses: {
          200: response('Image details retrieved successfully', '#/components/schemas/FileResponse'),
          401: errorResponse('Unauthorized'),
          404: errorResponse('Image not found'),
        },
      },
    },
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      ErrorResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: false },
          message: { type: 'string', example: 'Something went wrong' },
          error: { type: 'string', example: 'Detailed error message' },
          data: { nullable: true, example: null },
        },
      },
      MongoId: {
        type: 'string',
        example: '660f3c04d53c0f4fd66f8a11',
      },
      User: {
        type: 'object',
        properties: {
          _id: { $ref: '#/components/schemas/MongoId' },
          name: { type: 'string', example: 'Aniket Bhagwat' },
          email: { type: 'string', format: 'email', example: 'aniket@example.com' },
          password: { type: 'string', example: '$2b$10$abcdefghijklmnopqrstuv' },
          avatar_url: { type: 'string', nullable: true },
          isActive: { type: 'boolean', example: true },
          isDeleted: { type: 'boolean', example: false },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },
      UserSignupRequest: {
        type: 'object',
        required: ['name', 'email', 'password'],
        properties: {
          name: { type: 'string' },
          email: { type: 'string', format: 'email' },
          password: { type: 'string', minLength: 6 },
          avatar_id: { $ref: '#/components/schemas/MongoId' },
        },
      },
      LoginRequest: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: { type: 'string', format: 'email' },
          password: { type: 'string' },
        },
      },
      AuthResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: { type: 'string' },
          data: {
            type: 'object',
            properties: {
              user: { $ref: '#/components/schemas/User' },
              token: { type: 'string' },
            },
          },
        },
      },
      RegisterResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: { type: 'string' },
          data: { $ref: '#/components/schemas/User' },
        },
      },
      UserUpdateRequest: {
        type: 'object',
        required: ['user_id'],
        properties: {
          user_id: { $ref: '#/components/schemas/MongoId' },
          name: { type: 'string' },
          email: { type: 'string', format: 'email' },
          password: { type: 'string' },
          isActive: { type: 'boolean' },
        },
      },
      UserListResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean' },
          message: { type: 'string' },
          data: {
            type: 'object',
            properties: {
              users: {
                type: 'array',
                items: { $ref: '#/components/schemas/User' },
              },
              pagination: { type: 'object' },
            },
          },
        },
      },
      UserResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean' },
          message: { type: 'string' },
          data: { $ref: '#/components/schemas/User' },
        },
      },
      Board: {
        type: 'object',
        properties: {
          _id: { $ref: '#/components/schemas/MongoId' },
          board_title: { type: 'string' },
          description: { type: 'string' },
          isActive: { type: 'boolean' },
          isDeleted: { type: 'boolean' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },
      BoardCreateRequest: {
        type: 'object',
        required: ['board_title', 'description'],
        properties: {
          board_title: { type: 'string' },
          description: { type: 'string' },
        },
      },
      BoardUpdateRequest: {
        type: 'object',
        required: ['board_id'],
        properties: {
          board_id: { $ref: '#/components/schemas/MongoId' },
          board_title: { type: 'string' },
          description: { type: 'string' },
          isActive: { type: 'boolean' },
        },
      },
      BoardListResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean' },
          message: { type: 'string' },
          data: {
            type: 'object',
            properties: {
              boards: {
                type: 'array',
                items: { $ref: '#/components/schemas/Board' },
              },
              pagination: { type: 'object' },
            },
          },
        },
      },
      BoardResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean' },
          message: { type: 'string' },
          data: { $ref: '#/components/schemas/Board' },
        },
      },
      Card: {
        type: 'object',
        properties: {
          _id: { $ref: '#/components/schemas/MongoId' },
          card_title: { type: 'string' },
          description: { type: 'string' },
          board_id: { $ref: '#/components/schemas/MongoId' },
          isActive: { type: 'boolean' },
          isDeleted: { type: 'boolean' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },
      CardCreateRequest: {
        type: 'object',
        required: ['card_title', 'board_id'],
        properties: {
          card_title: { type: 'string' },
          description: { type: 'string' },
          board_id: { $ref: '#/components/schemas/MongoId' },
        },
      },
      CardUpdateRequest: {
        type: 'object',
        required: ['id'],
        properties: {
          id: { $ref: '#/components/schemas/MongoId' },
          card_title: { type: 'string' },
          description: { type: 'string' },
          board_id: { $ref: '#/components/schemas/MongoId' },
          isActive: { type: 'boolean' },
        },
      },
      CardListResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean' },
          message: { type: 'string' },
          data: {
            type: 'object',
            properties: {
              cards: {
                type: 'array',
                items: { $ref: '#/components/schemas/Card' },
              },
              meta: { type: 'object' },
            },
          },
        },
      },
      CardResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean' },
          message: { type: 'string' },
          data: { $ref: '#/components/schemas/Card' },
        },
      },
      Comment: {
        type: 'object',
        properties: {
          _id: { $ref: '#/components/schemas/MongoId' },
          message: { type: 'string' },
          user_id: { $ref: '#/components/schemas/MongoId' },
          user_details: { type: 'object' },
          card_id: { $ref: '#/components/schemas/MongoId' },
          isDeleted: { type: 'boolean' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },
      CommentCreateRequest: {
        type: 'object',
        required: ['message', 'author', 'card_id'],
        properties: {
          message: { type: 'string' },
          author: { $ref: '#/components/schemas/MongoId' },
          card_id: { $ref: '#/components/schemas/MongoId' },
        },
      },
      CommentUpdateRequest: {
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
      },
      CommentListResponse: {
        type: 'object',
        properties: {
          message: { type: 'string' },
          data: {
            type: 'object',
            properties: {
              comments: {
                type: 'array',
                items: { $ref: '#/components/schemas/Comment' },
              },
              pagination: { type: 'object' },
            },
          },
        },
      },
      CommentResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean' },
          message: { type: 'string' },
          data: { $ref: '#/components/schemas/Comment' },
        },
      },
      FileAsset: {
        type: 'object',
        properties: {
          _id: { $ref: '#/components/schemas/MongoId' },
          fileKey: { type: 'string' },
          url: { type: 'string' },
          originalName: { type: 'string' },
          size: { type: 'integer' },
          uploadedBy: { type: 'string', nullable: true },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },
      FileListResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean' },
          message: { type: 'string' },
          data: {
            type: 'array',
            items: { $ref: '#/components/schemas/FileAsset' },
          },
        },
      },
      FileResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean' },
          message: { type: 'string' },
          data: { $ref: '#/components/schemas/FileAsset' },
        },
      },
      MultipleFilesResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean' },
          message: { type: 'string' },
          data: {
            type: 'array',
            items: { $ref: '#/components/schemas/FileAsset' },
          },
        },
      },
      DeleteResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean' },
          message: { type: 'string' },
          data: { nullable: true, example: null },
        },
      },
    },
  },
};

export default swaggerSpec;

