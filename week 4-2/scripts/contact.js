class Contact{

    constructor(fullName, contactNumber, emailAddress) {
        this.FullName = fullName;
        this.ContactNumber = contactNumber;
        this.EmailAddress = emailAddress;
    }

    get FullName(){
        return this.m_fullName;
    }

    set FullName(newName){
        this.m_fullName = newName;
    }

    get ContactNumber(){
        return this.m_contactNumber;
    }

    set ContactNumber(newContactNumber){
        this.m_contactNumber = newContactNumber;
    }

    get EmailAddress(){
        return this.m_emailAddress;
    }

    set EmailAddress(newEmailAddress){
        this.m_emailAddress = newEmailAddress;
    }

    serialize(){
        if(this.FullName != "" && this.ContactNumber != "" && this.EmailAddress != ""){
            return `${this.FullName}, ${this.ContactNumber}, ${this.EmailAddress}`;
        }
        console.error("One or more of the properties of the Contact object are missing or invalid");
        return null;
    }

    deserialize(data){
        let propertyArray = data.split(",");
        this.FullName = propertyArray[0];
        this.ContactNumber = propertyArray[1];
        this.EmailAddress = propertyArray[2];

    }


}