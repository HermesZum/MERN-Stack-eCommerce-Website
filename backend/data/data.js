import bcrypt from 'bcryptjs';

const data = {
    users: [
        {
            name: 'Admin',
            email: 'admin@example.com',
            password: bcrypt.hashSync('Zum-120588'),
            isAdmin: true,
        }
    ],
    products: [
        {
            name: 'Champ Slim Shirt',
            slug: 'champion-slim-shirt',
            category: 'Shirts',
            image: '/images/shirt1.jpg',
            price: 90,
            countInStock: 12,
            brand: 'Champ',
            rating: 4.5,
            numReviews: 8,
            description: 'Shirt for men'
        },
        {
            name: 'Lava Slim Pants',
            slug: 'lava-slim-shirt',
            category: 'Pants',
            image: '/images/pants1.jpg',
            price: 120,
            countInStock: 14,
            brand: 'Lava',
            rating: 3.5,
            numReviews: 12,
            description: 'Pants for men.'
        },
        {
            name: 'Ronny Nice Shirt',
            slug: 'ronny-nice-shirt',
            category: 'Shirt',
            image: '/images/shirt2.jpg',
            price: 64,
            countInStock: 19,
            brand: 'Ronny',
            rating: 2.5,
            numReviews: 12,
            description: 'Nice shirt for men.'
        },
        {
            name: 'Ruth Jeans Pants',
            slug: 'ruth-jeans-pants',
            category: 'Pants',
            image: '/images/pants2.jpg',
            price: 140,
            countInStock: 0,
            brand: 'Champ',
            rating: 1.5,
            numReviews: 16,
            description: 'Jeans pants for men.'
        },
        {
            name: 'Lewis Comfort Shirt',
            slug: 'lewis-comfort-shirt',
            category: 'Shirt',
            image: '/images/shirt3.jpg',
            price: 71,
            countInStock: 22,
            brand: 'Lewis',
            rating: 1.0,
            numReviews: 22,
            description: 'Comfortable shirt for men.'
        },
        {
            name: 'Mythos White Pants',
            slug: 'mythos-white-pants',
            category: 'Pants',
            image: '/images/pants3.jpg',
            price: 108,
            countInStock: 0,
            brand: 'Mythos',
            rating: 5.0,
            numReviews: 11,
            description: 'White pants for men.'
        },
    ],
}

export default data;