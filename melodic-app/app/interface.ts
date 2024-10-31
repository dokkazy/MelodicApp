export interface CartItem {
    productId: string;
    quantity: number;
    price: number;
}

export interface SearchResults {
    Id: string;
    Name: string;
    Img: string;
    Price: number;
    UnitInStock: number;
    CreatedAt: string;
    Decription: string;
    Brand: {
        Id: string;
        Name: string;
    };
}

