import ItemModel from "../models/itemModel.js";

// Create a new item
export async function postItem(req, res) {
  console.log(req.user);
  if (req.user.role != "admin") {
    //AUTHORIZATION
    console.log("You are not authorized to add item");
    res.json({
      message: "You are not authorized to add item",
    });
    return;
  } else {
    const item = new ItemModel(req.body);
    try {
      await item.save();
      res.json({
        message: "Item saved successfully",
        data: item,
      });
    } catch {
      (err) => {
        res.json({
          message: "Error saving item",
          error: err,
        });
      };
    }
  }
}

// Get all items
export async function getItems(req, res) {
  try {
    const items = await ItemModel.find();
    res.json(items);
  } catch (err) {
    res.json({
      message: "Error fetching items",
      error: err,
    });
  }
}

// Update an item (by ID)
export async function putItem(req, res) {
  const { id } = req.params;
  const updatedData = req.body;
  try {
    await ItemModel.findByIdAndUpdate(id, updatedData, { new: true });
    res.json({
      message: "Item updated successfully",
      data: updatedItem,
    });
  } catch {
    (err) => {
      res.json({
        message: "Error updating item",
        error: err,
      });
    };
  }
}

// Delete an item (by ID)
export async function deleteItem(req, res) {
  const { id } = req.params;
  try {
    await ItemModel.findByIdAndDelete(id);
    res.json({
      message: "Item deleted successfully",
    });
  } catch {
    (err) => {
      res.json({
        message: "Error deleting item",
        error: err,
      });
    };
  }
}

export async function searchItems(req, res) {
  //const ItemName = req.body.name; from name

  const ItemName = req.params.name;
  try {
    //from params
    await ItemModel.find({
      name: ItemName,
    });
    res.json(items);
  } catch {
    (err) => {
      res.json({
        message: "Error fetching items",
        error: err,
      });
    };
  }
}

export async function goodItems(req, res) {
  try {
    //from params
    await ItemModel.find();
    res.json("Good Items");
  } catch {
    (err) => {
      res.json({
        message: "Error fetching items",
        error: err,
      });
    };
  }
}
