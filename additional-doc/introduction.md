# Introduction

The documentation in this section is designed as a tutorial for extending the Angular code.  
The best way to explain how to add a new robot method is to simply do it.  

For this reason we have added a dummy robot method in the code, considered all dependencies and documented everything.  
The dummy robot method is also included in the deliverd code, so developers can see the dependencies in the actual code and only need to change the name of the robot method to be added, its dependencies and properties.   
  
This section explains step by step which classes and methods need to be adapted and which need to be newly created.
The changes are shown using code snipets and there is always a link to the dependent class, component, service, model etc. 

## Main Changes to be made to add new robot method

- create new model NewMethodModel
- add new model in workflow model   
- create new component NewMethodComponent
- add new path to routing module NewMethodRoutingPath
- update methods used for routing 
- services??? 
