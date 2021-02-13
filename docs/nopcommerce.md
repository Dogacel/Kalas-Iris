# NopCommerce Integration Report
NopCommerce is an open-source ecommerce platform, thus is flexible for developers to use. Many others have created plugins for NopCommerce (found [here](https://www.nopcommerce.com/en/marketplace)), and another one can be created for Kalas-Iris integrations.

## Development Environment Issues
In order to develop plugins, NopCommerce holds is mandatory that Microsoft's Visual Studio is used. Since this platform is not available for Linux, below I provide an explanation on how Microsot Visual Studio Solutions (this is what a bundle of projects is called in MVS) can be opened and edited using Visual Studio Code IDE.

If you are available to use Microsoft Visual Studio as your IDE, or you know how to edit MVS Solutions using VSCode, you can skip this part.

### About Solution Files
A solution is a structure for organizing projects in Visual Studio. The solution maintains the state information for projects in the .sln (text-based, shared) file. The information contained in a solution file is not only used by the IDE,  it is also used my MsBuild, Cake Build or any other build tool to build or compile the solution. A solution is a structure for organising projects in Visual Studio. The solution maintains the state information for projects in text based .sln.

### About Project Files
Project Files a.k.a .csproj contains of all the source code files, icons, images, data files and anything else that will be compiled into an executable program or web site, or else is needed in order to perform the compilation. A project is an XML file (`*.csproj `) that defines a virtual folder hierarchy along with paths to all the items it “contains” and all the build settings. In Visual Studio, the project file is used by Solution Explorer to display the project contents and settings. When you compile your project, the MSBuild engine consumes the project file to create the executable. You can also customise projects to product other kinds of output.