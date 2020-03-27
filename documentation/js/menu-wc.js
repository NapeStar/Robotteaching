'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">robot-teaching documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter additional">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#additional-pages"'
                            : 'data-target="#xs-additional-pages"' }>
                            <span class="icon ion-ios-book"></span>
                            <span>Additional documentation</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="additional-pages"' : 'id="xs-additional-pages"' }>
                                    <li class="link ">
                                        <a href="additional-documentation/introduction.html" data-type="entity-link" data-context-id="additional">Introduction</a>
                                    </li>
                                    <li class="chapter inner">
                                        <a data-type="chapter-link" href="additional-documentation/steps-adding-new-method.html" data-context-id="additional">
                                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#additional-page-827ba1805f5fe1b02642abdd96b99557"' : 'data-target="#xs-additional-page-827ba1805f5fe1b02642abdd96b99557"' }>
                                                <span class="link-name">Steps adding new method</span>
                                                <span class="icon ion-ios-arrow-down"></span>
                                            </div>
                                        </a>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="additional-page-827ba1805f5fe1b02642abdd96b99557"' : 'id="xs-additional-page-827ba1805f5fe1b02642abdd96b99557"' }>
                                            <li class="link for-chapter2">
                                                <a href="additional-documentation/steps-adding-new-method/1.-creation-of-new-model.html" data-type="entity-link" data-context="sub-entity" data-context-id="additional">1. Creation of new Model</a>
                                            </li>
                                            <li class="link for-chapter2">
                                                <a href="additional-documentation/steps-adding-new-method/2.-add-model-to-workflow.html" data-type="entity-link" data-context="sub-entity" data-context-id="additional">2. Add Model to Workflow</a>
                                            </li>
                                            <li class="link for-chapter2">
                                                <a href="additional-documentation/steps-adding-new-method/3.-create-new-component.html" data-type="entity-link" data-context="sub-entity" data-context-id="additional">3. Create New Component</a>
                                            </li>
                                            <li class="link for-chapter2">
                                                <a href="additional-documentation/steps-adding-new-method/4.-add-route.html" data-type="entity-link" data-context="sub-entity" data-context-id="additional">4. Add Route</a>
                                            </li>
                                            <li class="link for-chapter2">
                                                <a href="additional-documentation/steps-adding-new-method/5.-update-all-routing-methods.html" data-type="entity-link" data-context="sub-entity" data-context-id="additional">5. Update all Routing Methods</a>
                                            </li>
                                        </ul>
                                    </li>
                        </ul>
                    </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-efd58c70f1e141cdef6d70afbafe1885"' : 'data-target="#xs-components-links-module-AppModule-efd58c70f1e141cdef6d70afbafe1885"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-efd58c70f1e141cdef6d70afbafe1885"' :
                                            'id="xs-components-links-module-AppModule-efd58c70f1e141cdef6d70afbafe1885"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AvailableJobsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AvailableJobsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ExecutionRunComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ExecutionRunComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HeaderComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HeaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NoPageFoundComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NoPageFoundComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WizardArmCartesianComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">WizardArmCartesianComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WizardArmJoinsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">WizardArmJoinsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WizardArmTrajectoryComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">WizardArmTrajectoryComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WizardBaseComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">WizardBaseComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WizardGripperGripComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">WizardGripperGripComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WizardGripperReleaseComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">WizardGripperReleaseComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WizardJobComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">WizardJobComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WizardNewMethodComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">WizardNewMethodComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WizardParentComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">WizardParentComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WorkflowTableComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">WorkflowTableComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-efd58c70f1e141cdef6d70afbafe1885"' : 'data-target="#xs-injectables-links-module-AppModule-efd58c70f1e141cdef6d70afbafe1885"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-efd58c70f1e141cdef6d70afbafe1885"' :
                                        'id="xs-injectables-links-module-AppModule-efd58c70f1e141cdef6d70afbafe1885"' }>
                                        <li class="link">
                                            <a href="injectables/WizardStepperService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>WizardStepperService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/ArmCartesian.html" data-type="entity-link">ArmCartesian</a>
                            </li>
                            <li class="link">
                                <a href="classes/ArmJoint.html" data-type="entity-link">ArmJoint</a>
                            </li>
                            <li class="link">
                                <a href="classes/ArmTrajectory.html" data-type="entity-link">ArmTrajectory</a>
                            </li>
                            <li class="link">
                                <a href="classes/Base.html" data-type="entity-link">Base</a>
                            </li>
                            <li class="link">
                                <a href="classes/BaseMove.html" data-type="entity-link">BaseMove</a>
                            </li>
                            <li class="link">
                                <a href="classes/GripperGrip.html" data-type="entity-link">GripperGrip</a>
                            </li>
                            <li class="link">
                                <a href="classes/GripperRelease.html" data-type="entity-link">GripperRelease</a>
                            </li>
                            <li class="link">
                                <a href="classes/Move.html" data-type="entity-link">Move</a>
                            </li>
                            <li class="link">
                                <a href="classes/MyErrorStateMatcher.html" data-type="entity-link">MyErrorStateMatcher</a>
                            </li>
                            <li class="link">
                                <a href="classes/NewMethod.html" data-type="entity-link">NewMethod</a>
                            </li>
                            <li class="link">
                                <a href="classes/SocketDataService.html" data-type="entity-link">SocketDataService</a>
                            </li>
                            <li class="link">
                                <a href="classes/Workflow.html" data-type="entity-link">Workflow</a>
                            </li>
                            <li class="link">
                                <a href="classes/WorkflowListElement.html" data-type="entity-link">WorkflowListElement</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/HttpRequestService.html" data-type="entity-link">HttpRequestService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JobsService.html" data-type="entity-link">JobsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/WizardParentStepperService.html" data-type="entity-link">WizardParentStepperService</a>
                                </li>
                            </ul>
                        </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});