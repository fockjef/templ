# templ
Regex based template engine with some nifty features. Fully compatibility with [mustache](https://mustache.github.io) templates while incorporating the ability to use simple logic within templates.

#### Features:
* Backtracking with ../ syntax
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
   foo: "bar",
   num: [1.6180339887498,2.7182818,3.14159],
   cat: {
      name: "Garfield",
      likes: ["spaghetti","naps"]
   }
}
````
**Template:**
````
foo is {{foo}}

Here are {{num.length}} numbers:
<ul>
   {{#num}}
   <li> Number {{#}} is {{this.toFixed(5)}}</li>
   {{/num}}
</ul>

{{#cat}}
{{name}} likes {{likes.join(" and ")}}.<br>
His favorite number is {{../num.slice(-1)}}.
{{/cat}}
````
**Results:**  
  
foo is bar

Here are 3 numbers:
<ul>
   <li> Number 1 is 1.61803</li>
   <li> Number 2 is 2.71828</li>
   <li> Number 3 is 3.14159</li>
</ul>

Garfield likes spaghetti and naps.<br>
His favorite number is 3.14159.
        
---        
For more examples and a better understanding of templating in general see the mustache documentation at [https://mustache.github.io/mustache.5.html](https://mustache.github.io/mustache.5.html)
