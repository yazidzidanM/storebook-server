/**
 * @swagger
 * tags:
 *   name: CartItems
 *   description: Cart items management (Authenticated user)
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CartItemInput:
 *       type: object
 *       required:
 *         - bookId
 *         - quantity
 *       properties:
 *         bookId:
 *           type: integer
 *           example: 16
 *         quantity:
 *           type: integer
 *           example: 2
 *
 *     CartItemArrayInput:
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/CartItemInput'
 *
 *     CartItemResponse:
 *       type: object
 *       properties:
 *         cartId:
 *           type: integer
 *           example: 4
 *         bookId:
 *           type: integer
 *           example: 16
 *         quantity:
 *           type: integer
 *           example: 2
 */

/**
 * @swagger
 * /api/cartItems/sync:
 *   post:
 *     summary: Sync guest cart items into authenticated user's cart
 *     tags: [CartItems]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CartItemArrayInput'
 *     responses:
 *       201:
 *         description: Cart synced successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/cartItems:
 *   post:
 *     summary: Add item to cart
 *     tags: [CartItems]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CartItemInput'
 *     responses:
 *       201:
 *         description: Item added to cart
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/cartItems:
 *   get:
 *     summary: Get all cart items for authenticated user
 *     tags: [CartItems]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of cart items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CartItemResponse'
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/cartItems/{bookId}:
 *   put:
 *     summary: Update cart item quantity
 *     tags: [CartItems]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: integer
 *         example: 12
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - quantity
 *             properties:
 *               quantity:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       200:
 *         description: Cart item updated
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/cartItems/{bookId}:
 *   delete:
 *     summary: Remove item from cart
 *     tags: [CartItems]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: integer
 *         example: 12
 *     responses:
 *       200:
 *         description: Cart item removed
 *       401:
 *         description: Unauthorized
 */
