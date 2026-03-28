import Array "mo:core/Array";
import Map "mo:core/Map";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Time "mo:core/Time";

actor {
  // Data Types
  type Product = {
    id : Text;
    name : Text;
    category : Text;
    price : Nat;
    originalPrice : Nat;
    description : Text;
    benefits : [Text];
    imageUrl : Text;
    rating : Float;
    reviewCount : Nat;
    inStock : Bool;
  };

  type Review = {
    productId : Text;
    reviewer : Text;
    rating : Nat;
    comment : Text;
    date : Int;
  };

  type Order = {
    orderId : Text;
    customerName : Text;
    phone : Text;
    address : Text;
    productId : Text;
    quantity : Nat;
    orderDate : Int;
  };

  // Review Ordering
  module Review {
    public func compare(review1 : Review, review2 : Review) : Order.Order {
      Int.compare(review2.date, review1.date); // Newest first
    };
  };

  // Storage
  let products = Map.empty<Text, Product>();
  let reviews = Map.empty<Text, [Review]>();
  let orders = Map.empty<Text, Order>();

  // Product Management
  public shared ({ caller }) func addProduct(product : Product) : async () {
    products.add(product.id, product);
  };

  public query ({ caller }) func getProduct(id : Text) : async Product {
    switch (products.get(id)) {
      case (null) { Runtime.trap("Product not found") };
      case (?product) { product };
    };
  };

  public query ({ caller }) func getAllProducts() : async [Product] {
    products.values().toArray();
  };

  public query ({ caller }) func getProductsByCategory(category : Text) : async [Product] {
    products.values().toArray().filter(func(p) { p.category == category });
  };

  // Category Management
  let categories = ["Portable Fans", "Neck Fans", "Mini Gadgets", "Kitchen Tools"];

  public query ({ caller }) func getAllCategories() : async [Text] {
    categories;
  };

  // Reviews
  public shared ({ caller }) func addReview(productId : Text, reviewer : Text, rating : Nat, comment : Text) : async () {
    let newReview = {
      productId;
      reviewer;
      rating;
      comment;
      date = Time.now();
    };

    let productReviews = switch (reviews.get(productId)) {
      case (null) { [newReview] };
      case (?existing) { existing.concat([newReview]) };
    };

    reviews.add(productId, productReviews);
  };

  public query ({ caller }) func getReviewsByProduct(productId : Text) : async [Review] {
    switch (reviews.get(productId)) {
      case (null) { [] };
      case (?rev) { rev.sort() };
    };
  };

  // Orders
  public shared ({ caller }) func placeOrder(order : Order) : async () {
    let newOrder = {
      order with
      orderDate = Time.now();
    };
    orders.add(order.orderId, newOrder);
  };

  public query ({ caller }) func getOrder(orderId : Text) : async Order {
    switch (orders.get(orderId)) {
      case (null) { Runtime.trap("Order not found") };
      case (?order) { order };
    };
  };

  public query ({ caller }) func getAllOrders() : async [Order] {
    orders.values().toArray();
  };
};
