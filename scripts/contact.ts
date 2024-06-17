namespace core {

    export class Contact {

        private m_fullName: string;
        private m_contactNumber: string;
        private m_emailAddress: string

        constructor(fullName: string, contactNumber: string, emailAddress: string) {
            this.m_fullName = fullName;
            this.m_contactNumber = contactNumber;
            this.m_emailAddress = emailAddress;
        }

        get FullName() {
            return this.m_fullName;
        }

        set FullName(newName: string) {
            this.m_fullName = newName;
        }

        get ContactNumber() {
            return this.m_contactNumber;
        }

        set ContactNumber(newContactNumber: string) {
            this.m_contactNumber = newContactNumber;
        }

        get EmailAddress() {
            return this.m_emailAddress;
        }

        set EmailAddress(newEmailAddress: string) {
            this.m_emailAddress = newEmailAddress;
        }

        serialize() :string{
            if (this.FullName !== "" && this.ContactNumber !== "" && this.EmailAddress !== "") {
                return `${this.FullName}, ${this.ContactNumber}, ${this.EmailAddress}`;
            }
            console.error("One or more of the properties of the Contact object are missing or invalid");
            return "";
        }

        deserialize(data: string) {
            let propertyArray = data.split(",");
            this.FullName = propertyArray[0];
            this.ContactNumber = propertyArray[1];
            this.EmailAddress = propertyArray[2];
        }


    }
}