export interface simplifiedProduct {
    _id: string;
    price: number;
    name: string;
    slug: string;
    categoryName: string;
    imageUrl: string;
}

export interface fullProduct {
    _id: string;
    price: number;
    name: string;
    slug: string;
    categoryName: string;
    image: unknown;
    description?: string;
}

export interface CartItem {
    productId: string;
    quantity: number;
    price: number;
}
