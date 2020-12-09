# US-01: Browse Shop Information

As a User I can browse shop information so that I can decide whether to purchase goods in this store or not.

## **Acceptance criteria:**

<table>
    <tr>
        <td>1.</td>
        <td>I can browse the "Main" page:
            <ol>
                <li>I can see a Banner with offers.</li>
                <li>I can see the latest News Cards.</li>
                <li>I can see popular Product Items.</li>
                <li>I can see different Product Categories.</li>
                <li>I can see a Promo Block:
                    <ol>
                        <li>image;</li>
                        <li>text.</li>
                    </ol>
                </li>
            </ol> 
        </td>
    </tr>
    <tr>
        <td>2.</td>
        <td>I can navigate between different menu sections.</td>
    </tr>
    <tr>
        <td>3.</td>
        <td>I can browse "Catalog".
            <ol>     
                <li>I can see Product Cards. Any Product Card has:
                    <ol>
                      <li>image;</li>
                      <li>old price;</li>
                      <li>new price;</li>
                      <li>name;</li>
                      <li>lable;</li>
                      <li>"ADD TO CART" button.</li>
                    </ol>
                </li>
                <li>I can see Product Categories.</li>  
                <li>I can use pagination to see other Product Cards.</li>
                <li>I can perform <a href="US02-FilterProductItemInCatalog.md">US-02: Filter Product Item in the "Catalog" page</a>.</li>
                <li>I can perform <a href="US03SortProductItemsInCatalog.md">US-03: Sort Product Items in the "Catalog" page</a>.</li>
            </ol>   
        </td>
    </tr>
    <tr>
        <td>4.</td>
        <td>I can browse "News":
            <ol>     
                <li>I can browse News Card List. Any News Card has:</li>
                    <ol>
                        <li>image;</li>
                        <li>heading.</li>
                    </ol>  
                <li>I can browse a News Article by clicking on its title in the News list.</li>
                <li>I can use pagination to see other News Cards.</li>
           </ol> 
        </td> 
    </tr>
    <tr>
        <td>5.</td>
        <td>I can browse "About":
            <ol>     
                <li>I can read Shop Info;</li>
                <li>I can look at images, photos, videos representing the Shop.</li>
            </ol>
        </td>
    </tr>
    <tr>
        <td>6.</td>
        <td>I can browse "Contacts":
            <ol>     
                <li>I can browse Company Address(es);</li>
                <li>I can browse Company Phone Number(s);</li>
                <li>I can browse Company E-mail(s);</li>
                <li>I can browse all the Pickup Points;</li>
                <li>I can look at Map, where Company Address(es) are shown; </li>
                <li>I can look at a Feedback Form.</li>
            </ol>     
        </td>
    </tr>
    <tr>
        <td>7.</td>
        <td>I can browse "Wish List":
            <ol>
                <li>I can see the Product’s Image;</li> 
                <li>I can see the Product’s Name;</li> 
                <li>I can see the Product's Price.</li> 
                <li>I can perform <a href="US05-AddProductItemToWishList.md">US-05: Add a Product Item to the "Wish List"</a>.</li> 
                <li>I can perform <a href="US06-DeleteProductItemFromWishList.md">US-06: Delete a Product Item from the "Wish List"</a>.</li>
            </ol>
        </td>
    </tr>
</table>

## **Alternative scenarios:**

<table>
    <tr>
        <td colspan="2">The server could not find the requested page.</td>
    </tr>
    <tr>
        <td>1A</td>
        <td>I can see the following message: "Nothing to see here".</td> 
    </tr>
    <tr>
    <td>2A</td>
    <td>I can perform <a href="US04-FindProductItems.md">US-04: Find Product Item(s)</a>.</td>
    </tr>
    <tr>
        <td>3A</td>
        <td>I can return to the "Main" Page.</td>
    </tr>
    <tr>
        <td colspan="2">Internal Server Error occurred when requesting the page.</td>
    </tr>
    <tr>
        <td>1B</td>
        <td>I can see the following message: Server Error occurred. Keep calm, we're working on this.</td> 
    </tr>
    <tr> 
        <td>2B</td>
        <td>I can return to the "Main" Page.</td>
    </tr>
</table>
