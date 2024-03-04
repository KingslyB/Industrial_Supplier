(function (core) {

    class User{
        constructor(displayName = "", emailAddress = "", username = "", password = "") {
            this.DisplayName = displayName;
            this.EmailAddress = emailAddress;
            this.Username = username;
            this.Password = password;
        }

        set DisplayName(newDisplayName){
            this.m_displayName = newDisplayName;
        }
        get DisplayName(){
            return this.m_displayName;
        }

        set EmailAddress(newEmailAddress){
            this.m_emailAddress = newEmailAddress;
        }

        get EmailAddress(){
            return this.m_emailAddress;
        }

        set Username(newUsername){
            this.m_username = newUsername;
        }

        get Username(){
            return this.m_username;
        }

        set Password(newPassword){
            this.m_password = newPassword;
        }

        get Password(){
            return this.m_password;
        }

        //overridden
        toString(){
            return `Display Name: ${this.DisplayName}\nEmail Address: ${this.EmailAddress}\nUsername: ${this.Username}`;
        }

        toJSON(){
            return {
                "DisplayName" : this.DisplayName,
                "EmailAddress" : this.EmailAddress,
                "Username" : this.Username,
                "Password" : this.Password
            }

        }
        fromJSON(data){
            this.DisplayName = data.DisplayName;
            this.EmailAddress = data.EmailAddress;
            this.Username = data.Username;
            this.Password = data.Password;

        }

        serialize() {
            if (this.DisplayName !== "" && this.EmailAddress !== "" && this.Username !== "" && this.Password !== "") {
                return `${this.DisplayName}, ${this.EmailAddress}, ${this.Username}, ${this.Password}`;
            }
            console.error("One or more of the properties of the User object are missing or invalid");
            return null;
        }

        deserialize(data) {
            let propertyArray = data.split(",");
            this.DisplayName = propertyArray[0];
            this.EmailAddress = propertyArray[1];
            this.Username = propertyArray[2];
            this.Password = propertyArray[3];
        }

    }

    core.User = User;
})(core || (core = {}));