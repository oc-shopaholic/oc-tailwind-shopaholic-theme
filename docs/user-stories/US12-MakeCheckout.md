# US-12: Make a Checkout

 As a User I can Make a Checkout so that I can buy Product Item(s).

## **Acceptance criteria:**

<table>
    <tr>
        <td>1.</td>
        <td>I can browse my Order:
            <ol>
                <li>Order Item(s) image;</li>
                <li>Order Item(s) name;</li>
                <li>Order Item(s) quantity;</li>
                <li>Order Item(s) price;</li>
                <li>Total Order Cost Excluding Delivery;</li>
                <li>Total Order Cost Including Delivery.</li>
            </ol>
        </td>
    </tr>
    <tr>
        <td>2.</td>
        <td>I can delete an Order Item:
            <ol>
                <li>When an Order Item is deleted, its cost is subtracted from the Total Order Cost Excluding Delivery and Total Order Cost Including Delivery.</li>
            </ol>
        </td>
    </tr>
    <tr>
        <td>3.</td>
        <td>I can change the quantity of an Order Item.
            <ol>
                <li>When I change the quantity of an Order Item its cost is subtracted from or added to the Total Order Cost Excluding Delivery and Total Order Cost Including Delivery.</li>
                <li>The quantity of an Ordered Item must be ≥ 1.</li>
            </ol>
        </td>
    </tr>
    <tr>
        <td>4.</td>
        <td>I can add an Order Item to the Wish list.</td>
    </tr>
    <tr>
        <td>5.</td>
        <td>I can delete an Order Item from the Wish list.</td>
    </tr>
    <tr>
        <td>6.</td>
        <td>I can apply a coupon to the Order.
            <ol>
                <li>When I apply a coupon to the Order a certain summ is subtracted from the Total Order Cost Excluding Delivery and Total Order Cost Including Delivery.</li>
            </ol>
        </td>
    </tr>
    <tr>
        <td>7.</td>
        <td>I can choose the Delivery Method: 
            <ol>
                <li><b>pickup;</b></li>
                <li>courier delivery;</li>
                <li>postal delivery.</li>
            </ol>
            Default Delivery Method - pickup.</br>
            When I change the Delivery Method the Total Order Cost Including Delivery is updated.</td>
    </tr>
    <tr>
        <td>8.</td>
        <td>I can read Delivery Terms and Conditions.</td>
    </tr>
    <tr>
        <td>9.</td>
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
        <td>10.</td>
        <td>I can choose a Pickup Point from the suggested ones.</td>
    </tr>
    <tr>
        <td>11.</td>
        <td>The system must validate the entered information:
            <ol>
                <li>when I exit the active field for Contact Details entering;</li>
                <li>when I click the "Order" button.</li>
            </ol>
        </td>
    </tr>
    <tr>
        <td>12.</td>
        <td>I can choose a Payment Method:
            <ol>
                <li><b>cash to the courier;</b></li>
                <li>card.</li>
            </ol>
            Default Payment Method - "cash to the courier".</td>
    </tr>
    <tr>
        <td>13.</td>
        <td>I can place an order by clicking the "Order" button.</td>
    </tr>
    <tr>
        <td>14.</td>
        <td>I can see "Your order #2ХХХХХХ is accepted. Thank you for shopping at our shop!" message.</td>
    </tr>
    <tr>
        <td>15.</td>
        <td>I can return to the catalog by clicking the "Continue Shopping" button.</td>
    </tr>
</table>

## **Alternative scenarios:**

<table>
    <tr>
        <td colspan="2">I choose a "Card" payment method.</td>
    </tr>
    <tr>
        <td>15A.</td>
        <td>I must be redirected to the payment system.</td>
    </tr>
    <tr>
        <td>15A.</td>
        <td>I can make a payment there.</td>
    </tr>
    <tr>
        <td>16A.</td>
        <td>See pp. 14 of the main scenario.</td>
    </tr>
    <tr>
        <td colspan="2">I choose the "Courier Delivery" or "Postal Delivery" Delivery Method.</td>
    </tr>
    <tr>
        <td>9B.</td>
        <td>I can input my Contact Details:
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
        <td>10B.</td>
        <td>See pp. 10 of the main scenario.</td>
    </tr>
    <tr>
        <td colspan="2">I Logged in before performing a Checkout.</td>
    </tr>
    <tr>
        <td>9C.</td>
        <td>I can check whether all my Contact Details are up to date.</td>
    </tr>
    <tr>
        <td>10C.</td>
        <td>I can correct my contact details and input missing ones.</td>
    </tr>
    <tr>
        <td>11C.</td>
        <td>See pp. 10 of the main scenario.</td>
    </tr>
    <tr>
        <td colspan="2">I didn’t fill Required field and clicked the "Order" button.</td>
    </tr>
    <tr>
        <td>14D</td>
        <td>I can see the "Please, fill this required field in." message under the Required field I didn't fill in.</td>
    </tr>
    <tr>
        <td>15D.</td>
        <td>See pp. 9 of the main scenario.</td>
    </tr>
    <tr>
        <td colspan="2">I filled the "E-mail" field wrong and clicked the "Order" button.</td>
    </tr>
    <tr>
        <td>14E.</td>
        <td>I can see the "The format of your E-mail must be username@hostname.domain" message under the "E-mail" field.</td>
    <tr>
        <td>15E.</td>
        <td>See pp. 9 of the main scenario.</td>
    </tr>
    <tr>
        <td colspan="2">I clicked on Required Field and left it without filling in.</td>
     </tr>
     <tr>
      <td>14F.</td>
        <td>I can see the "Required field" message under the Required field.</td>
    <tr>
        <td>15F.</td>
        <td>See pp. 9 of the main scenario.</td>
    </tr>
    <tr>
        <td colspan="2">I applied a coupon to the Order but it doesn't exist.</td>
     </tr>
     <tr>
      <td>7G.</td>
        <td>I can see the "Invalid coupon" message under the "Coupon" field.</td>
    </tr>
    <tr>
        <td>8G.</td>
        <td>See pp. 7 of the main scenario.</td>
    </tr>
</table>