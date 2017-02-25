/**
  * This is the users class.
  * It has the following attributes:
  *   id
  *   user
  *   name
  *   images
  *   description
  *   category
  *   cost
  *   condition
  *   negotiability
  */
/** Class declaration */
function Product(id, user, name, images, description, category, cost, condition, negotiability){
  this.id = id;
  this.user = user;
  this.name = name;
  this.images = images;
  this.description = description;
  this.category = category;
  this.cost = cost;
  this.condition = condition;
  this.negotiability = negotiability;
}
/** Negotiatibility constants */
Product.NEGOTIABLE_NO = 0;
Product.NEGOTIABLE_YES = 1;

/** Condition constants */
Product.CONDITION_EXCELLENT = 5;
Product.CONDITION_GOOD = 4;
Product.CONDITION_AVERAGE = 3;
Product.CONDITION_POOR = 2;
Product.CONDITION_BAD = 1;

/** Getter method */
Product.prototype.getDetails = function(){
  ProductObj = {id: this.id,
                  user: this.user,
                  name: this.name,
                  images: this.images,
                  description: this.description,
                  category: this.category,
                  cost: this.cost,
                  condition: this.condition,
                  negotiability: this.negotiability};
  return ProductObj;
}

module.exports = Product;
