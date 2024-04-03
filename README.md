# Ray Formatter

Just a simple C# Text Formatter for now. Just playing around but if you find it useful - enjoy.

## Commands

EF Parser - takes a list of DB field names and formats them into an EF C# Class.

```
my_field_1
my_field_2
my_datetime_field
```

Create a new text file and list out the database field names one per line.
Then choose the `EF Parser` command to format an EF C# Class with appropriate attributes.

```csharp
[Table("")]
public class MyObject
{
	
///<summary></summary>
[Column("my_field_1")]
[JsonProperty("")]
public string my_field_1 { get; set; }

///<summary></summary>
[Column("my_field_2")]
[JsonProperty("")]
public string my_field_2 { get; set; }

///<summary></summary>
[Column("my_datetime_field")]
[JsonProperty("")]
public string my_datetime_field { get; set; }

}
```

## Documentation

[VSCode Extension Documentation](https://code.visualstudio.com/api)

[Code Samples](https://github.com/microsoft/vscode-extension-samples)