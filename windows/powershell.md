# Powershell


- [7](#7)
  - [Version](#version)
  - [uptime](#uptime)
  - [service](#service)
  - [reading files](#reading-files)

## 7


### Version

- `get-host`

### uptime


- `get-uptime`


### service


[See Services](./services.md)


### reading files

[get-content](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.management/get-content?view=powershell-7.2)
    - `-Tail`, specifies number of lines to show. Like tail's -n
    - `-Wait`, like linux tail
<br>
- content of file
    ```powershell
    1..100 | ForEach-Object { Add-Content -Path .\LineNumbers.txt -Value "This is line $_." }
    Get-Content -Path .\LineNumbers.txt

    This is Line 1
    This is Line 2
    ...
    This is line 99.
    This is line 100.
    ```
- last line of a text file
    ```powershell
    # last line of text
    Get-Item -Path .\LineNumbers.txt | Get-Content -Tail 1

    This is Line 100
    ```
- specific line
    ```powershell
    (Get-Content -Path .\LineNumbers.txt -TotalCount 25)[-1]

    This is Line 25
    ```
- multiple files
    ```powershell
    Get-Content -Path C:\Temp\* -Filter *.log
    ```
