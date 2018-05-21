# templ
Regex based template engine with some nifty features. Fully compatibility with [mustache](https://mustache.github.io) templates while incorporating the ability to use simple logic within templates.

#### Features:
* Backtracking with _../_ syntax
* Reference current array index (1-based) with {{#}}
* Ability to execute arbitrary javascript within template {{somenum.toFixed(3)}}
* _this_ syntax for referencing current context

#### Caveats:
* Slower performance than tokenizer based engines (but still plenty fast)
* Ability to execute arbitrary javascript within template {{maliciousFunction()}}

#### Examples:
**Data:**
````
{
   first: "Bob",
   last: "Smith",
   dob: "3/2/1987",
   pets: [
      { name: "Rover", type: "dog", favorite: true },
      { name: "Kitty", type: "cat" },
      { name: "Goldy", type: "fish" }
   ]
}
````
**Template:**
````
{{=% %=}}
{{first}} {{last}} is {{new Date(Date.now()-new Date(this.dob)).getFullYear()-1970}} years old.<br>
{{first}} has {{pets.length}} pet{{pets.length==1?"":"s"}}.<br>
{{#pets}}
{{name}} is a {{type}}{{#favorite}} and is {{../../first}}'s favorite pet{{/favorite}}.<br>
{{/pets}}
````
**Results:**

Bob Smith is 31 years old.<br>
Bob has 3 pets.<br>
Rover is a dog and is Bob's favorite pet.<br>
Kitty is a cat.<br>
Goldy is a fish.<br>

---
For more examples and a better understanding of templating in general see the mustache documentation at [https://mustache.github.io/mustache.5.html](https://mustache.github.io/mustache.5.html)
