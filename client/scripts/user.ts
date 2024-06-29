namespace core{

    export class User {
        private m_displayName: string;
        private m_emailAddress: string;
        private m_username: string;
        private m_password: string;

        constructor(displayName: string = "", emailAddress: string = "", username: string = "", password: string = "") {
            this.m_displayName = displayName;
            this.m_emailAddress = emailAddress;
            this.m_username = username;
            this.m_password = password;
        }

        set DisplayName(newDisplayName: string) {
            this.m_displayName = newDisplayName;
        }

        get DisplayName(): string {
            return this.m_displayName;
        }

        set EmailAddress(newEmailAddress: string) {
            this.m_emailAddress = newEmailAddress;
        }

        get EmailAddress(): string {
            return this.m_emailAddress;
        }

        set Username(newUsername: string) {
            this.m_username = newUsername;
        }

        get Username(): string {
            return this.m_username;
        }

        set Password(newPassword: string) {
            this.m_password = newPassword;
        }

        get Password(): string {
            return this.m_password;
        }

        //overridden
        toString(): string {
            return `Display Name: ${this.DisplayName}\nEmail Address: ${this.EmailAddress}\nUsername: ${this.Username}`;
        }

        toJSON(): object {
            return {
                "DisplayName": this.DisplayName,
                "EmailAddress": this.EmailAddress,
                "Username": this.Username,
                "Password": this.Password
            }

        }

        fromJSON(data: { DisplayName: string, EmailAddress: string, Username: string, Password: string }) {
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

        deserialize(data: string) {
            let propertyArray = data.split(",");
            this.DisplayName = propertyArray[0];
            this.EmailAddress = propertyArray[1];
            this.Username = propertyArray[2];
            this.Password = propertyArray[3];
        }

    }
}
