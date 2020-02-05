//Storage controller
const StrCtrl = (function(){
    return {
        saveItem: (itemObj) => {
            let data;
            if (localStorage.getItem('calories')) {
                data = JSON.parse(localStorage.getItem('calories'));
                data.items.push({...itemObj});
            } else {
                data = {
                    items: [{...itemObj}]
                }
            }
            localStorage.setItem('calories', JSON.stringify(data));
        },
        deleteItem: (id) => {
            let data = JSON.parse(localStorage.getItem('calories'));
            for (let i = 0; i < data.items.length; i++){
                if (data.items[i].id == id) {
                    data.items.splice(i,1);
                }
            }
            localStorage.setItem('calories', JSON.stringify(data));
        },
        updateItem: (editedItem) => {
            let caloriesChange;
            let data = JSON.parse(localStorage.getItem('calories'));
            for( let i = 0; i <data.items.length; i++ ){
                if (data.items[i].id == editedItem.id){
                    caloriesChange = editedItem.calories - data.items[i].calories;
                    data.items[i].name = editedItem.name;
                    data.items[i].calories = editedItem.calories;
                    localStorage.setItem('calories', JSON.stringify(data));
                    return caloriesChange;
                }
            }
        },
        getItemById: (id) => {
            let items = JSON.parse(localStorage.getItem('calories')).items;
            return items.find( element => element.id == id );
        },
        getListItems: () => { 
            if (localStorage.getItem('calories')){
                return JSON.parse(localStorage.getItem('calories')).items;
            } else {
                return [];
            }
        },
        clearAll: () => {
            localStorage.removeItem('calories');
        },
        getTotalCalories: () => { 
            if (localStorage.getItem('calories')) {
                return JSON.parse(localStorage.getItem('calories')).totalCalories;
            } else {
                return 0;
            }
        },
        updateTotalCalories: (calories) => {
            let data = JSON.parse(localStorage.getItem('calories'));
            if (data.totalCalories) {
                data.totalCalories += calories;
            } else {
                data.totalCalories = calories;
            }
            localStorage.setItem('calories', JSON.stringify(data));
            return data.totalCalories;
        },
        nullifyCalories: () => {
            let data = JSON.parse(localStorage.getItem('calories'));
            data.totalCalories = 0;
            localStorage.setItem('calories', JSON.stringify(data));
        }
    }
})();



//Item controller
const ItemCtrl = (function(StrCtrl) {
    const Item = function(id, name, calories){
        this.id = id;
        this.name = name;
        this.calories = calories;
    }
    //Data Structure
    const data = {
        currentItem: null,
        totalCalories: 0,
        }
    return {
        generateItem: ( name, calories ) => {
            //Generate id
            let id;
            if (StrCtrl.getListItems.length) {
                id = StrCtrl.getListItems[StrCtrl.getListItems.length-1].id + 1;
            } else {
                id = 0;
            }

            //Create new item
            return new Item(id, name, +calories);
        },
        changeCurrentItem: (itemID) => data.currentItem = itemID,
        getCurrentItem: () => data.currentItem,
        clearAll: () => { 
            data.totalCalories = 0;
            data.currentItem = null
        }
    }
})(StrCtrl);


//UI Controller
const UICtrl = (function() {
    const UISelectors = {
        itemList: `#item-list`,
        addBtn: `.add-btn`,
        clearAll: `.clear-btn`,
        updateBtn: `.update-btn`,
        deleteBtn: `.delete-btn`,
        backBtn: `.back-btn`,
        itemNameInput: `#item-name`,
        itemCaloriesInput: `#item-calories`,
        totalCaloriesShow: `.total-calories`
    }
    return {
        populateItemList: (items) => {
            let html = '';
            items.forEach(item => {
                html += `<li class="collection-item" id="item-${item.id}">
                <strong>${item.name} </strong> <em>${item.calories} Calories</em>
                <a href="#" class="secondary-content">
                  <i class=" edit-item fa fa-pencil"></i>
                </a>
              </li>`;
            });
            //Insert list items
            document.querySelector(UISelectors.itemList).innerHTML = html;
        },
        getSelectors: () => UISelectors,
        getItemInput: () => { return {name: document.querySelector(UISelectors.itemNameInput).value,
         calories: document.querySelector(UISelectors.itemCaloriesInput).value}},
        addListItem: (item) => {
            //Create li element
            const li = document.createElement(`li`);
            li.classList.add(`collection-item`);
            li.id = `item-${item.id}`;

            //Add HTML
            li.innerHTML = `<strong>${item.name} </strong> <em>${item.calories} Calories</em>
            <a href="#" class="secondary-content">
              <i class="edit-item fa fa-pencil"></i>
            </a>`;

            //Insert item
            document.querySelector(UISelectors.itemList).insertAdjacentElement(`beforeend`,li);

            //Change calories total
        },
        clearInputs: () => {
            document.querySelector(UISelectors.itemNameInput).value = '';
            document.querySelector(UISelectors.itemCaloriesInput).value = '';
        },
        showTotalCalories: (calories) => document.querySelector(UISelectors.totalCaloriesShow).innerHTML = calories,
        clearEditState: () => {
            UICtrl.clearInputs();
            document.querySelector(UISelectors.updateBtn).style.display = `none`;
            document.querySelector(UISelectors.deleteBtn).style.display = `none`;
            document.querySelector(UISelectors.backBtn).style.display = `none`;
            document.querySelector(UISelectors.addBtn).style.display = `inline`;
        },
        clearItemList: () => document.querySelector(UISelectors.itemList).innerHTML = ``
    }
})();


//App Controller
const App = (function (ItemCtrl, UICtrl, StrCtrl) {
    const UISelectors = UICtrl.getSelectors();

    //Event Listeners
    const loadEventListeners = () => {
        //Add item event
        document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);
        document.querySelector(UISelectors.itemList).addEventListener('click', itemEdit);
        document.querySelector(UISelectors.updateBtn).addEventListener('click', itemEditedSubmit);
        document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDelete);
        document.querySelector(UISelectors.backBtn).addEventListener('click', back);
        document.querySelector(UISelectors.clearAll).addEventListener('click', clearAll);
    }

    //Add item submit
    const itemAddSubmit = (e) => {
        e.preventDefault();
        //Get form input from UI Controller
        const input = UICtrl.getItemInput();
        if (input.name && input.calories) {
            //Add item to the array
            const newItem = ItemCtrl.generateItem(input.name, input.calories);
            
            //Add item to the UI
            UICtrl.addListItem(newItem);

            //Add item to local storage
            StrCtrl.saveItem(newItem);

            //Change totalCalories
            const totalCalories = StrCtrl.updateTotalCalories(newItem.calories);
            UICtrl.showTotalCalories(totalCalories);

            //Clear input fields
            UICtrl.clearInputs();
        }
        e.preventDefault();
    }

    //Edit item 
    const itemEdit = (e) => {
        if (e.target.classList.contains(`edit-item`)) {
            //Get the list item ID
            const listID = +`${e.target.parentNode.parentNode.id}`.replace('item-','');
            
            //Get item to edit
            const itemToEdit = StrCtrl.getItemById(listID);
            ItemCtrl.changeCurrentItem(listID);

            //Fill inputs with edited item 
            document.querySelector(UISelectors.itemNameInput).value = itemToEdit.name;
            document.querySelector(UISelectors.itemCaloriesInput).value = itemToEdit.calories;

            //Handle showing&hiding buttons
            document.querySelector(UISelectors.updateBtn).style.display = `inline`;
            document.querySelector(UISelectors.deleteBtn).style.display = `inline`;
            document.querySelector(UISelectors.backBtn).style.display = `inline`;
            document.querySelector(UISelectors.addBtn).style.display = `none`;
        }
        e.preventDefault();
    }

    //Submit edited item
    const itemEditedSubmit = (e) => {
        const updatedName = document.querySelector(UISelectors.itemNameInput).value;
        const updatedCalories = document.querySelector(UISelectors.itemCaloriesInput).value;
        const editedItemId = ItemCtrl.getCurrentItem();

        let editedItem = {id: editedItemId, name: updatedName, calories: updatedCalories};
        let caloriesChange = StrCtrl.updateItem(editedItem);
    
        //Hide buttons
        UICtrl.clearEditState();
        
        //Fetch items from data structure
        const items = StrCtrl.getListItems();

        //Populate list with Items
        UICtrl.populateItemList(items);

        //Change totalCalories
        const totalCalories = StrCtrl.updateTotalCalories(caloriesChange);
        UICtrl.showTotalCalories(totalCalories);

        e.preventDefault();
    }

    //Delete item 
    const itemDelete = (e) => {
        //Delete current item from data
        const ItemToDeleteID = ItemCtrl.getCurrentItem();
        const ItemToDeleteCalories = StrCtrl.getItemById(ItemToDeleteID).calories;
       
        //Delete from LocalStorage
        StrCtrl.deleteItem(ItemToDeleteID);

        //Hide buttons
        UICtrl.clearEditState();
        
        //Change totalCalories
        const totalCalories = StrCtrl.updateTotalCalories(-(ItemToDeleteCalories));
        UICtrl.showTotalCalories(totalCalories);
        
        //Fetch items from updated data structure
        const items = StrCtrl.getListItems();
        
        //Populate list with Items
        UICtrl.populateItemList(items);

        e.preventDefault();
    }

    //Back - unsave changes
    const back = (e) => {
        //Hide buttons
        UICtrl.clearEditState();
        e.preventDefault();
    }

    //Clear all
    const clearAll = (e) => {
        ItemCtrl.clearAll();
        StrCtrl.clearAll();
        UICtrl.showTotalCalories(0);
        UICtrl.clearItemList();
        e.preventDefault();
    }
   return {
       init: function (){
           console.log(`Initializing App...`);

           //Show only add button
           UICtrl.clearEditState();

           //Fetch items from data structure
           const items = StrCtrl.getListItems();

           //Populate list with Items
           UICtrl.populateItemList(items);

           //Load event listeners
           loadEventListeners();

           //Change totalCalories
           const totalCalories = StrCtrl.getTotalCalories();
           UICtrl.showTotalCalories(totalCalories);
       }
   }
}) (ItemCtrl, UICtrl, StrCtrl);


//Performing when the page is loaded
App.init();
