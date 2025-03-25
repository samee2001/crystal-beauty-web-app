import ItemModel from "../models/itemModel.js";


// Create a new item
export function postItem(req, res) {
    console.log(req.user);
    if(req.user.role != "admin"){  //AUTHORIZATION
        console.log("You are not authorized to add item");
        res.json({ 
            message: "You are not authorized to add item",
        });
        return;
    }
    else{
    const item = new ItemModel(req.body);
    item.save()
        .then(() => {
            res.json({
                message: "Item saved successfully",
                data: item,
            });
        })
        .catch((err) => {
            res.json({
                message: "Error saving item",
                error: err,
            });
        }
    );}
}

// Get all items
export function getItems(req, res) {
    ItemModel.find()
        .then((items) => {
            res.json(items);
        })
        .catch((err) => {
            res.json({
                message: "Error fetching items",
                error: err,
            });
        });
}

// Update an item (by ID)
export function putItem(req, res) {
    const { id } = req.params;
    const updatedData = req.body;

    ItemModel.findByIdAndUpdate(id, updatedData, { new: true })
        .then((updatedItem) => {
            res.json({
                message: "Item updated successfully",
                data: updatedItem,
            });
        })
        .catch((err) => {
            res.json({
                message: "Error updating item",
                error: err,
            });
        });
}

// Delete an item (by ID)
export function deleteItem(req, res) {
    const { id } = req.params;

    ItemModel.findByIdAndDelete(id)
        .then(() => {
            res.json({
                message: "Item deleted successfully",
            });
        })
        .catch((err) => {
            res.json({
                message: "Error deleting item",
                error: err,
            });
        });
}

export function searchItems(req,res){
    //const ItemName = req.body.name; from name

    const ItemName = req.params.name;   //from params
    ItemModel.find(
        {
            name:ItemName
        }
    )
    .then((items) => {
        res.json(items);
    }).catch((err) => {
        res.json({
            message: "Error fetching items",
            error: err,
        });
    });

}


export function goodItems(req,res){
      //from params
    ItemModel.find( {}
    )
    .then(() => {
        res.json("Good Items");
    }).catch((err) => {
        res.json({
            message: "Error fetching items",
            error: err,
        });
    });
}


