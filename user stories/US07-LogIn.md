# US-07: Log in

### As a User I can Log in to the System so that I can easily buy a Product Item.

#### **Acceptance criteria:**

<table>
    <tr>
        <td>1.</td>
        <td>I can go to the "Log in/Register" page.</td>
    </tr>
    <tr>
        <td>2.</td>
        <td>I can fill the "Username" field in.</td>
    </tr>
    <tr>
        <td>3.</td>
        <td>I can fill the "Password" field in.</td>
    </tr>
     <tr>
        <td>4.</td>
        <td>I can press on "Remember me" checkbox in order no to be automatically signed out when I leave the System. </td>
    </tr>
    <tr>
        <td>5.</td>
        <td> I can submit my Log in.</td>
    </tr>
    <tr>
        <td>6.</td>
        <td> The shop must validate the entered information:
            <ol>
                <li>when I exit the active "Username" or "Password" field.</li>
                <li>when I click the "LOG IN" hyperlink. </li>
            </ol></td>
    </tr>
    <tr>
        <td>7.</td>
        <td>I can see the page i visited before I went to the "Log in" page.</td>
    </tr>
    <tr>
        <td>8.</td>
        <td>Can see "My Аccount" and "Log out" hyperlinks in the header. </td>
    </tr>
    
</table>

#### **Alternative scenarios:**

<table>
    <tr>
        <td colspan="2">I didn’t fill "Username" field and submitted the Log in.</td>
    </tr>
    <tr>
        <td>7A.</td>
        <td> I can see the "Please, fill this required field in." message under the "Username" field.</td>
    </tr>
    <tr>
        <td>8A.</td>
        <td> See pp.2 of the main scenario.</td>
    </tr>
    <tr>
        <td colspan="2">I didn’t fill  the "Password" field and submitted the Log in.</td>
    </tr>
    <tr>
        <td>7B.</td>
        <td>  I can see the "Please, fill this required field in." message under the "Password" field.</td>
    </tr>
    <tr>
        <td>8B.</td>
        <td>See pp. 3 of the main scenario.</td>
    </tr>
    <tr>
        <td colspan="2"> I filled the "Username" field wrong and submitted my log in but there's no User with such an username. </td>
    </tr>
    <tr>
        <td>6C.</td>
        <td> I can see the "Sorry, this User does not exist" message under the "Username" field.</td>
    </tr>
    <tr>
        <td>7C.</td>
        <td>See pp.2 of the main scenario.</td>
    </tr>
     <tr>
        <td colspan="2"> I filled the "Username" field wrong and submitted my log in. </td>
    </tr>
    <tr>
        <td>6D.</td>
        <td> I can see the "Sorry, you filled in the field wrong" message under the "Username" field.</td>
    </tr>
    <tr>
        <td>7D.</td>
        <td>See pp.2 of the main scenario.</td>
    </tr>
     <tr>
        <td colspan="2"> I filled the "Password" field wrong and submitted my log in. </td>
    </tr>
    <tr>
        <td>6E.</td>
        <td> "Sorry, you filled in the field wrong" message under the "Password" field.</td>
    </tr>
    <tr>
        <td>7E.</td>
        <td>See pp.3 of the main scenario.</td>
    </tr>
        <tr>
        <td colspan="2"> I've clicked on "Username" field and left it without filling in. </td>
    </tr>
    <tr>
        <td>3F.</td>
        <td>I can see the "Required field" message under the field.</td>
    </tr>
    <tr>
        <td>4F.</td>
        <td>See pp.2 of the main scenario.</td>
    </tr>
    <tr>
        <td colspan="2"> I've clicked on "Password" field and left it without filling in. </td>
    </tr>
    <tr>
        <td>4G.</td>
        <td> I can see "Required field" message under the field.</td>
    </tr>
    <tr>
        <td>5G.</td>
        <td>See pp.3 of the main scenario.</td>
    </tr>
    <tr>
        <td colspan="2">I want to Log in but I have no Account.</td>
    </tr>
    <tr>
        <td>2H.</td>
        <td>I can perform <a href="US02-FilterProductItemInCatalog.md"> US-08: Sign Up.</a></td>
</table>