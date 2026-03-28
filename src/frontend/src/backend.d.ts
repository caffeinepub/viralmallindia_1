import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Order {
    customerName: string;
    orderDate: bigint;
    productId: string;
    orderId: string;
    address: string;
    quantity: bigint;
    phone: string;
}
export interface Review {
    date: bigint;
    productId: string;
    comment: string;
    rating: bigint;
    reviewer: string;
}
export interface Product {
    id: string;
    inStock: boolean;
    originalPrice: bigint;
    name: string;
    description: string;
    imageUrl: string;
    category: string;
    benefits: Array<string>;
    rating: number;
    price: bigint;
    reviewCount: bigint;
}
export interface backendInterface {
    addProduct(product: Product): Promise<void>;
    addReview(productId: string, reviewer: string, rating: bigint, comment: string): Promise<void>;
    getAllCategories(): Promise<Array<string>>;
    getAllOrders(): Promise<Array<Order>>;
    getAllProducts(): Promise<Array<Product>>;
    getOrder(orderId: string): Promise<Order>;
    getProduct(id: string): Promise<Product>;
    getProductsByCategory(category: string): Promise<Array<Product>>;
    getReviewsByProduct(productId: string): Promise<Array<Review>>;
    placeOrder(order: Order): Promise<void>;
}
