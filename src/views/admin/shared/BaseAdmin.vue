<template>
	<div class="v-admin">
		<div v-if="store.state.auth.loggedIn && store.state.auth.appReady"  ref="body" class="sb-nav-fixed">
			<nav class="sb-topnav navbar navbar-expand navbar-light border-bottom shadow-sm bg-white">
				<a class="navbar-brand" href="index.html">School</a>
				<button class="btn btn-light rounded-circle btn-sm order-1 order-lg-0 my-2 ml-1" @click="navToggle()" id="sidebarToggle" href="#">
					<i class="fas fa-bars"></i>
				</button>
				<ul class="navbar-nav align-items-center ml-auto">
					<li class="nav-item dropdown no-caret mr-2">
						<a class="btn btn-light btn-sm border rounded-circle" id="navbarDropdownAlerts" href="javascript:void(0);" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fas fa-bell"></i></a>
						<div class="dropdown-menu dropdown-menu-right border-0 mt-3 shadow-sm" aria-labelledby="navbarDropdownAlerts">
							<a class="dropdown-item" href="#">Settings</a>
						</div>
					</li>
					<li class="nav-item dropdown mr-1">
						<a class="btn btn-light border rounded-circle my-2 p-0" id="userDropdown" href="javascript:void" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img class="rounded-circle p-0" src="assets/img/noimage.jpg" height="30" width="30"></a>
						<div class="dropdown-menu dropdown-menu-right shadow-sm mt-3 border-0" aria-labelledby="userDropdown" style="width: 200px">
							<div class="d-flex justify-content-center pt-2">
								<img src="" class="rounded-circle border border-info bg-white" height="65" width="65" alt=" ">
							</div>
							<div class="item-wrapper">
								<div class="small m-0 mt-1 text-center text-truncate px-3">admin@gmail.com</div>
							</div>
							<div class="dropdown-divider"></div>
							<a class="dropdown-item small text-muted py-2" href="profile">Profile</a>
							<a class="dropdown-item small text-muted py-2" @click.prevent="logout" href="logout">Logout</a>
						</div>
					</li>
				</ul>
			</nav>
			<div id="layoutSidenav">
				<div id="layoutSidenav_nav">
					<nav class="sb-sidenav accordion sb-sidenav-dark shadow-sm" id="sidenavAccordion">
						<div class="sb-sidenav-menu">
							<div class="nav pb-5 pt-4">

								<router-link class="nav-link" to="/admin/home">
									<div class="sb-nav-link-icon"><i class="fas fa-columns fa-lg"></i></div>
									Dashboard
								</router-link>

								<div class="sb-sidenav-menu-heading">Interface</div>

								<a class="nav-link collapsed" data-toggle="collapse" data-target="#collapseStd" aria-expanded="false" aria-controls="collapseLayouts">
		                            <div class="sb-nav-link-icon"><i class="fas fa-users fa-lg"></i></div>
		                            Students
		                            <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
		                        </a>
		                        <div class="collapse" id="collapseStd" aria-labelledby="headingOne" data-parent="#sidenavAccordion">
		                            <nav class="sb-sidenav-menu-nested nav">
		                                <router-link class="nav-link" to="/admin/students">All Students</router-link>
		                                <router-link class="nav-link" to="/admin/students/add">Add Students</router-link>
		                            </nav>
		                        </div>							

								<a class="nav-link collapsed" data-toggle="collapse" data-target="#collapseStaff" aria-expanded="false" aria-controls="collapseLayouts">
		                            <div class="sb-nav-link-icon"><i class="fas fa-chalkboard-teacher fa-lg"></i></div>
		                            Staffs
		                            <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
		                        </a>
		                        <div class="collapse" id="collapseStaff" aria-labelledby="headingOne" data-parent="#sidenavAccordion">
		                            <nav class="sb-sidenav-menu-nested nav">
		                                <router-link class="nav-link" to="/admin/staffs">All Staffs</router-link>
		                                <router-link class="nav-link" to="/admin/staffs/add">Add Staff</router-link>
		                            </nav>
		                        </div>

								<a class="nav-link collapsed" data-toggle="collapse" data-target="#collapseG1" aria-expanded="false" aria-controls="collapseLayouts">
		                            <div class="sb-nav-link-icon"><i class="fas fa-users fa-lg"></i></div>
		                            Guardians
		                            <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
		                        </a>
		                        <div class="collapse" id="collapseG1" aria-labelledby="headingOne" data-parent="#sidenavAccordion">
		                            <nav class="sb-sidenav-menu-nested nav">
		                                <router-link class="nav-link" to="/admin/guardians">All Guardians</router-link>
		                                <router-link class="nav-link" to="/admin/guardians/add">Add Guardians</router-link>
		                            </nav>
		                        </div>


								<a class="nav-link collapsed" data-toggle="collapse" data-target="#collapseAcademics" aria-expanded="false" aria-controls="collapseLayouts">
		                            <div class="sb-nav-link-icon"><i class="fas fa-chalkboard-teacher fa-lg"></i></div>
		                            Academics
		                            <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
		                        </a>
		                        <div class="collapse" id="collapseAcademics" aria-labelledby="headingOne" data-parent="#sidenavAccordion">
		                            <nav class="sb-sidenav-menu-nested nav">
		                                <router-link class="nav-link" to="/admin/subjects">Subjects</router-link>
		                                <router-link class="nav-link" to="/admin/class">Class</router-link>
		                                <router-link class="nav-link" to="/admin/fees/timetable">Timetable</router-link>
		                                <router-link class="nav-link" to="/admin/fees/attendance">Attendance</router-link>
		                            </nav>
		                        </div>


								<a class="nav-link collapsed" data-toggle="collapse" data-target="#collapseFee" aria-expanded="false" aria-controls="collapseLayouts">
		                            <div class="sb-nav-link-icon"><i class="fas fa-chalkboard-teacher fa-lg"></i></div>
		                            Bursary
		                            <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
		                        </a>
		                        <div class="collapse" id="collapseFee" aria-labelledby="headingOne" data-parent="#sidenavAccordion">
		                            <nav class="sb-sidenav-menu-nested nav">
		                                <router-link class="nav-link" to="/admin/fees/overview">Overview</router-link>
		                                <router-link class="nav-link" to="/admin/fees">Fees</router-link>
		                                <router-link class="nav-link" to="/admin/fees/debtors">Debtors</router-link>
		                                <router-link class="nav-link" to="/admin/fees/transactions">Transactions</router-link>
		                            </nav>
		                        </div>
								

								<div class="sb-sidenav-menu-heading">Teaching</div>

								<router-link class="nav-link" to="class">
									<div class="sb-nav-link-icon"><i class="fas fa-envelope fa-lg"></i></div>
									Mail center
								</router-link>

								<router-link class="nav-link" to="class">
									<div class="sb-nav-link-icon"><i class="fas fa-list-alt fa-lg"></i></div>
									Stream
								</router-link>

								<div class="sb-sidenav-menu-heading">Tools</div>

								<router-link class="nav-link" to="class">
									<div class="sb-nav-link-icon"><i class="fas fa-toolbox fa-lg"></i></div>
									Settings
								</router-link>
							</div>
						</div>
						<div class="sb-sidenav-footer">
							<div class="small text-center pt-3 pb-2">Privacy &middot; Terms</div>
						</div>
					</nav>
				</div>
				<div  @click="skinNavToggle()" id="layoutSidenav_content">
					<main>
						<slot name="header"></slot>

						<div class="container-lg pb-7 mt-3">
							<slot/>
							<snackbar></snackbar>
						</div>
					</main>
				</div>
			</div>
			<footer class="d-footer py-4 bg-light mt-auto">
				<div class="container-fluid">
					<div class="d-flex justify-content-between small">
						<div class="text-muted">Copyright &copy; Your Website 2020</div>
						<div>
							<a href="#">Privacy Policy</a>
								&middot;
							<a href="#">Terms &amp; Conditions</a>
						</div>
					</div>
				</div>			
			</footer>
		</div>

		<div v-if="store.state.auth.appLoadRetry" class="reload-wrapper fade-in">
	        <div class="d-flex flex-column align-items-center reload-container">
	            <div class="err-info-text text-center px-2">Oops we are unable to load the page please try again</div>
	            <button class="d-flex btn reload-btn no-focus mt-3" @click="adminGate()">
	                <svg viewBox="0 0 24 24" class="btn-icon">
	                    <g><path d="M12 2C6.486 2 2 6.486 2 12c0 .414.336.75.75.75s.75-.336.75-.75c0-4.687 3.813-8.5 8.5-8.5s8.5 3.813 8.5 8.5-3.813 8.5-8.5 8.5c-2.886 0-5.576-1.5-7.13-3.888l2.983.55c.402.08.798-.193.874-.6.076-.408-.194-.8-.6-.874l-4.663-.86c-.204-.04-.414.01-.58.132-.168.123-.276.31-.3.515l-.57 4.706c-.05.412.242.785.653.835.03.004.06.006.09.006.375 0 .698-.278.745-.66l.32-2.63C5.673 20.36 8.728 22 12 22c5.514 0 10-4.486 10-10S17.514 2 12 2z"></path></g>
	                </svg>
	                <span class="btn-text text-nowrap">Try again</span>
	            </button>
	        </div>
	    </div>


	</div>
</template>

<script>
// components
import Snackbar from '@/components/Snackbar'

// library:vue
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import store from '@/store'

// middleware
import middleware from '@/middleware'

// apis
import User from '@/apis/User'

export default {
    name: 'BaseAdmin',
    components: {
    	Snackbar
    },

    setup() {
    	const store = useStore()
    	const router = useRouter()

    	const adminGate = async() => {
    		store.commit('SET_APP_LOAD_RETRY', false)
		    await middleware.admin((res) => { 
		    	if (res === false)  {
		    		store.commit('SET_APP_READY', false)
		            router.push({ path: '/login', query: { redirect: 'forbidden' } })
		        } 
		        else if(res === true) {
		        	store.commit('SET_APP_READY', true)
		        }
		    })
		}

    	return {
           store, adminGate
    	}
    },

    methods: {
  	    navToggle () {
	        this.$refs.body.classList.toggle('sb-sidenav-toggled')
  	    },

	  	skinNavToggle () {
	  		if (window.innerWidth >= 992) {
	  			return
	  		}

	  		if (this.$refs.body.classList.contains('sb-sidenav-toggled')) {
		        this.$refs.body.classList.toggle('sb-sidenav-toggled')
		    }
	  	},

		logout () {
	  		User.logout()
	  		.then(() => {
	  			localStorage.removeItem('SB_USER')
	  			this.$store.commit('SET_USER', '')
	  			this.$router.push({ path: '/' })
	  		})
	    }
    }
}

</script>

<style lang="scss" scoped>
@import '@/assets/scss/theme/themeone';

.reload-wrapper {
	height: 100vh;
	width: 100%;
	background-color: #fff;
}

.reload-container {
	margin-top: 100px;
}

.reload-btn {
   border-radius: 30px;
   background-color: rgb(24, 145, 240);
   color: #fff;
}

.reload-btn:hover {
    background-color: rgb(24, 145, 219);
}

.no-focus:focus {
    box-shadow: none;
}

.err-info-text {
    line-height: 1.3125;
    font-size: 15px;
}

.btn-icon {
    font-size: 16px;
    font-weight: bolder;
    margin-right: .3rem;
    color: rgb(255, 255, 255);
    fill: rgb(255, 255, 255);
    height: 1.3rem;
    width: 1.3rem;
    user-select: none;
}

.btn-text {
    font-size: 14px;
    font-weight: 600;
    line-height: 1.3;
}
</style>