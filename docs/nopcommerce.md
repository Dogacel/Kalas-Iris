# NopCommerce Integration Report
NopCommerce is an open-source ecommerce platform, thus is flexible for developers to use. Many others have created plugins for NopCommerce (found [here](https://www.nopcommerce.com/en/marketplace)), and another one can be created for Kalas-Iris integrations.

## Development Environment Issues
In order to develop plugins, NopCommerce holds is mandatory that Microsoft's Visual Studio is used. Since this platform is not available for Linux, below I provide an explanation on how Microsot Visual Studio Solutions (this is what a bundle of projects is called in MVS) can be opened and edited using Visual Studio Code IDE.

If you are available to use Microsoft Visual Studio as your IDE, or you know how to edit MVS Solutions using VSCode, you can skip this part.

### About Solution Files
A solution is a structure for organizing projects in Visual Studio. The solution maintains the state information for projects in the `.sln` (text-based, shared) file. The information contained in a solution file is not only used by the IDE,  it is also used my MsBuild, Cake Build or any other build tool to build or compile the solution. A solution is a structure for organising projects in Visual Studio. The solution maintains the state information for projects in text based .sln.

### About Project Files
Project Files a.k.a `.csproj` contains of all the source code files, icons, images, data files and anything else that will be compiled into an executable program or web site, or else is needed in order to perform the compilation. A project is an XML file (`*.csproj `) that defines a virtual folder hierarchy along with paths to all the items it “contains” and all the build settings. In Visual Studio, the project file is used by Solution Explorer to display the project contents and settings. When you compile your project, the `MSBuild` engine consumes the project file to create the executable. You can also customise projects to product other kinds of output, which will be handy for creating the Kalas-Iris integration plugin.

Do not forget that you need the [C# extension](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csharp) installed for VSCode, and [.NET 5.0 SDK or later](https://dotnet.microsoft.com/download).

### Manipulating Solution Files
Start VSCode. Open the **Terminal** from **View** > **Terminal** from the main menu.

To create a new solution file in your current working directory named SwcApi:
```shell
dotnet new sln --name SwcApi
```

To create two new projects, named api and Api.Database:
```shell
dotnet new webapi --name api
dotnet new classlib --name Api.Database
```

To add these projects to our `SwcApi` solution file:
```shell
dotnet sln "swcApi.sln" add "api/api.csproj"
dotnet sln "swcApi.sln" add "Api.Database/Api.Database.csproj"
```

To remove a project with project file `someDodgy.csproj` use:
```shell
dotnet sln remove "someDodgy.csproj"
```
The syntax is `dotnet sln remove [path-to-project.csproj]`.

## How to write a plugin for NopCommerce
After the issues about the IDE are resolved, we shall begin developing the plugin. 

### The plugin structure, required files, and locations
1. First thing you need to do is to create a new "Class Library" project in the solution, into `/Plugins` directory in the root of your solution.
```.NET Core CLI
dotnet new classlib -o Plugins/Nop.Plugin.KalasIris
```

2. Add the library to the solution:
```.NET Core CLI
dotnet sln add Plugins/Nop.Plugin.KalasIris/KalasIris.csproj
```

3. Open the `.csproj` file of the plugin and replace its contents with the following:
```
<Project Sdk="Microsoft.NET.Sdk">
    <PropertyGroup>
        <TargetFramework>netcoreapp3.1</TargetFramework>
        <Copyright>SOME_COPYRIGHT</Copyright>
        <Company>YOUR_COMPANY</Company>
        <Authors>SOME_AUTHORS</Authors>
        <PackageLicenseUrl>PACKAGE_LICENSE_URL</PackageLicenseUrl>
        <PackageProjectUrl>PACKAGE_PROJECT_URL</PackageProjectUrl>
        <RepositoryUrl>REPOSITORY_URL</RepositoryUrl>
        <RepositoryType>Git</RepositoryType>
        <OutputPath>..\..\Presentation\Nop.Web\Plugins\PLUGIN_OUTPUT_DIRECTORY</OutputPath>
        <OutDir>$(OutputPath)</OutDir>
        <!--Set this parameter to true to get the dlls copied from the NuGet cache to the output of your    project. You need to set this parameter to true if your plugin has a nuget package to ensure that   the dlls copied from the NuGet cache to the output of your project-->
        <CopyLocalLockFileAssemblies>true</CopyLocalLockFileAssemblies>
    </PropertyGroup>
    <ItemGroup>
        <ProjectReference Include="..\..\Presentation\Nop.Web.Framework\Nop.Web.Framework.csproj" />
        <ClearPluginAssemblies Include="$(MSBuildProjectDirectory)\..\..\Build\ClearPluginAssemblies.proj" />
    </ItemGroup>
    <!-- This target execute after "Build" target -->
    <Target Name="NopTarget" AfterTargets="Build">
        <!-- Delete unnecessary libraries from plugins path -->
        <MSBuild Projects="@(ClearPluginAssemblies)" Properties="PluginPath=$(MSBuildProjectDirectory)\$(OutDir)" Targets="NopClear" />
    </Target>
</Project>
```

Create this into `\Plugins` directory in the root of your solution (do not mix up with `\Plugins` subdirectory located in `\Nop.Web\` directory which is used for already deployed plugins). Name the plugin `Nop.Plugin.KalasIris`.



