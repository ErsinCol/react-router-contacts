const contacts = [
    {
        id: 1,
        first: "John",
        last: "Doe",
        avatar: "https://example.com/johndoe.jpg",
        twitter: "@johndoe",
        notes: "Met at the conference last week.",
        favorite: true,
    },
    {
        id: 2,
        first: "Jane",
        last: "Smith",
        avatar: "https://example.com/janesmith.jpg",
        twitter: "@janesmith",
        notes: "Work colleague, very reliable.",
        favorite: false,
    },
    {
        id: 3,
        first: "Alice",
        last: "Johnson",
        avatar: "https://example.com/alicejohnson.jpg",
        twitter: "@alicejohnson",
        notes: "Old friend from college.",
        favorite: true,
    },
    {
        id: 4,
        first: "Bob",
        last: "Brown",
        avatar: "https://example.com/bobbrown.jpg",
        twitter: "@bobbrown",
        notes: "New neighbor, loves gardening.",
        favorite: false,
    },
    {
        id: 5,
        first: "Emily",
        last: "Davis",
        avatar: "https://example.com/emilydavis.jpg",
        twitter: "@emilydavis",
        notes: "Cousin, visiting next month.",
        favorite: true,
    }
];


export function getContacts(query){
    return new Promise((resolve, reject)=>{
        if(query === null) query = ""

        const filteredContacts = contacts.filter(contact => {
            const fullname = (contact.first + " " + contact.last).toLowerCase();
            return fullname.includes(query.toLowerCase());
        })

        resolve(filteredContacts);
    })
}

export function getContact(contactId){
    return new Promise((resolve, reject)=>{
        const contact = contacts.find(contact => contact.id == contactId);
        resolve(contact);
    })
}

export function createContact(){
    return new Promise((resolve, reject)=>{
        const newContact = {
            id: contacts.length + 1,
            first: "",
            last: "",
            avatar: "",
            twitter: "",
            notes: "",
            favorite: false,
        };

        contacts.push(newContact);
        resolve(newContact);
    })
}

export function updateContact(contactId, updates){
    return new Promise((resolve, reject)=>{
        const index = contacts.findIndex(contact => contact.id == contactId);
        if(index !== -1){
            contacts[index] = {
                ...contacts[index],
                ...updates
            }
            resolve(contacts[index])
        }else{
            reject(new Error("Contact not found."));
        }
    })
}

export function deleteContact(contactId){
    return new Promise((resolve, reject)=>{
        const index = contacts.findIndex(contact => contact.id == contactId);
        if(index != -1){
            contacts.splice(index, 1);
            resolve();
        }else{
            reject(new Error("Contact not found."));
        }
    })
}