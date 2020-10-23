# US-11: Make a Checkout

### As a User I can Make a Checkout so stay I can buy Product Item(s).

#### **Acceptance criteria:**

<table>
    <tr>
        <td>1.</td>
        <td>I can browse my Order:
            <ol>
                <li>Order Item(s) image;
</li>
                <li>Order Item(s) name;</li>
                <li>Order Item(s) quantity; </li>
                <li>Order Item(s) cost;</li>
                <li>Total Order Cost Excluding Delivery;</li>
                <li>Total Order Cost Including Delivery.</li>
            </ol></td>
            </tr>
    <tr>
        <td>2.</td>
        <td>I can delete an Order Item:
            <ol> 
                <li>When an Order Item is deleted, its cost is subtracted from the Total Order Cost Excluding Delivery and Total Order Cost Including Delivery. </li>
            </ol></td>
    </tr>
    <tr>
        <td>3.</td>
        <td>I can change the quantity of an Order Item.
            <ol>
                <li>When I change the quantity of an Order Item its cost is subtracted from or added to the Total Order Cost Excluding Delivery and Total Order Cost Including Delivery.</li>
                <li>The quantity of an Ordered Item must be ≥ 1.</li>
            </ol></td>
    </tr>
    <tr>
        <td>4.</td>
        <td>I can choose the Delivery Method: 
            <ol>
                <li>pickup;</li>
                <li> <b>delivery;</b></li>
                <li> <b>mailing.</b></li>
            </ol>
            Default Delivery Method - pickup. </br>
            When I change the Delivery Method the Total Order Cost Including Delivery is updated.</td>
    </tr>
    <tr>
        <td>5.</td>
        <td>I can read Delivery Terms and Conditions.</td>
    </tr>
    <tr>
        <td>6.</td>
        <td>I can input my  Contact Details:
            <ol>
                <li>first name*;</li>
                <li>last name*;</li>
                <li>postal address*;</li>
                <li>country*;</li>
                <li>zip сode*;</li>
                <li>e-mail*;</li>
                <li>phone number*.</li>
            </ol>
            *required field</td>
    </tr>
    <tr>
        <td>7.</td>
        <td>The shop must validate the entered information:
            <ol>
                <li>when I exit the active field for Contact Details entering;</li>
                <li>when I click the "ORDER" button.</li>
            </ol></td>
    </tr>
    <tr>
        <td>8.</td>
        <td>I can choose a Payment Method:
            <ol>
                <li><b>cash to the courier;</b></li>
                <li>card.
                    <ol>
                        <li>Default Payment Method - "cash to the courier".</li>
                    </ol></li>
            </ol>
        </td>
    </tr>
    <tr>
        <td>9.</td>
        <td>I can place an order by clicking the "ORDER" button.</td>
    </tr>
    <tr>
        <td>10.</td>
        <td>I can see "Your order #2ХХХХХХ is accepted. Thank you for shopping at Sneakers shop, LLC!" message on the shop. </td>
    </tr>
    <tr>
        <td>11.</td>
        <td>I can return to the catalog by clicking the "CONTINUE SHOPPING" button.</td>
    </tr>
</table>

#### **Alternative scenarios:**

<table>
    <tr>
        <td colspan="2">I've entered information in pp.6 incorrect.</td>
    </tr>
    <tr>
        <td>8A.</td>
        <td>I can read information about the error and advice how to fix it.</td>
    </tr>
    <tr>
        <td>9A.</td>
        <td>I can correct the information.</td>
    </tr>
    <tr>
        <td>10A.</td>
        <td>See pp.7 of the main scenario.</td>
    </tr>
    <tr>
        <td colspan="2">I choose a "card" payment method.</td>
    </tr>
    <tr>
        <td>10B.</td>
        <td>I must be redirected to the payment system shop.</td>
    </tr>
    <tr>
        <td>11B.</td>
        <td>I can make a payment there.</td>
    </tr>
    <tr>
        <td>12B.</td>
        <td>See pp.10 of the main scenario.</td>
    </tr>
    <tr>
        <td colspan="2">I choose the "pickup" Delivery Method.</td>
    </tr>
    <tr>
        <td>6C.</td>
        <td>I can input my contact details:
            <ol>
                <li>first name*;</li>
                <li>last name*;</li>
                <li>e-mail*;</li>
                <li>phone number.</li>
            </ol>
        *required field</td>
    </tr>
    <tr>
        <td>7C.</td>
        <td>I can choose a Pickup Point from the suggested ones.</td>
    </tr>
    <tr>
        <td>8C.</td>
        <td>See pp.10 of the main scenario.</td>
    </tr>
<tr>
        <td colspan="2">I’ve Logged in before performing Checkout.</td>
    </tr>
    <tr>
        <td>6D.</td>
        <td>I can check whether all my Contact Details are up to date. </td>
    </tr>
    <tr>
        <td>7D.</td>
        <td>I can correct my contact details and input missing ones.</td>
    </tr>
    <tr>
        <td>8D.</td>
        <td>See pp.7 of the main scenario.</td>
    </tr>
</table>