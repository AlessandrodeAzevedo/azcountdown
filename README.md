## AzCountdown 

A simple countdown using javascript for many uses

![image info](./AzCountdown.png)

### how to use?

Charge this script in your page:

```
<script src="https://page-of-you-use/folder-with-code/az-countdown.min.js"></script>
```

after using as you want, following the examples

#### <ins>Basic</ins>

```
<div id="AzCountdown"></div>
<script>
new AzCountdown({
    date: '2022-12-17 12:00:00' //your future date
});
</script>
```

#### <ins>Specific div</ins>

By default the countdown is printed on the tag with the id "AzCountdown", but you can change this by passing in the id of a specific location you want

```
<div id="specificDiv"></div>
<script>
new AzCountdown({
    elementID: 'specificDiv'
});
</script>
```

#### <ins>Custom labels</ins>

```
<div id="AzCountdown"></div>
<script>
new AzCountdown({
    labels: {
        days: 'DAYS LABEL',
        hours: 'HOURS LABEL',
        minutes: 'MINUTES LABEL',
        seconds: 'SECONDS LABEL'
    }
});
</script>
```

#### <ins>Custom layout</ins>

```
<div id="AzCountdown"></div>
<script>
new AzCountdown({
    customLayout: {
        days: 'customNumberDays', // ID of the element where you want the day to be printed
        hours: 'customNumberHours', // ID of the element where you want the hours to be printed
        minutes: 'customNumberMinutes', // ID of the element where you want the minutes to be printed
        seconds: 'customNumberSeconds' // ID of the element where you want the seconds to be printed
    }
});
</script>
```

#### <ins>Remote infos</ins>

You can centralize the information in one page and use that same information in several countdown pages, for that you need to use the following tag ```<azcountdown>``` in your page where it contains the information as in the example:

*https://page-with-informations.com*
```
<az-countdown>
    {
        "key" : "myKey",
        "date" : "2022-12-17 21:00:00"
    }
</az-countdown>
```

and then use on the countdown page like this

*https://page-with-countdown.com*
```
<div id="AzCountdown"></div>
<script>
new AzCountdown({
    uri: 'https://page-with-informations.com',
    key: 'myKey'
});
</script>
```

the use of the key, is to use the same page with information many times