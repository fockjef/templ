# templ
Regex based template engine with some nifty features. Fully compatibility with [mustache](https://mustache.github.io) templates while incorporating the ability to use simple logic within templates.

#### Features:
{% raw %}
* Backtracking with _../_ syntax
* Reference current array index (1-based) with {{#}}
* Ability to execute arbitrary javascript within template {{somenum.toFixed(3)}}
* _this_ syntax for referencing current context
{% endraw %}

#### Caveats:
{% raw %}
* Slower performance than tokenizer based engines (but still plenty fast)
* Ability to execute arbitrary javascript within template {{maliciousFunction()}}
{% endraw %}

#### Demo:
Test suite of the official specification [here](templ.html).

---
For more examples and a better understanding of templating in general see the mustache documentation at [https://mustache.github.io/mustache.5.html](https://mustache.github.io/mustache.5.html)
