<template>
	<div class="v-admin">
		<div v-if="store.state.auth.appReady"  ref="body" class="sb-nav-fixed">
			<nav class="sb-topnav navbar navbar-expand navbar-light border-bottom shadow bg-white pe-2">
				<a class="navbar-brand" href="#">School</a>
				<button class="btn btn-light rounded-circle btn-sm order-1 order-lg-0 my-2 ms-1 me-2" @click="navToggle()" id="sidebarToggle" href="#">
					<i class="fas fa-bars fa-sm"></i>
				</button>
				<ul class="navbar-nav align-items-center ms-auto">
					<li class="nav-item dropdown no-caret me-2">
						<a class="btn btn-light btn-sm border rounded-circle" id="navbarDropdownAlerts" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="fas fa-bell"></i></a>
						<div class="dropdown-menu dropdown-menu-end border-0 mt-3 shadow-sm">
							<a class="dropdown-item" href="#">Settings</a>
						</div>
					</li>
					<li class="nav-item dropdown me-2">
						<a class="btn btn-light border rounded-circle my-2 p-0" id="userDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><img class="rounded-circle p-0" src="assets/img/noimage.jpg" height="30" width="30"></a>
						<div class="dropdown-menu dropdown-menu-end shadow-lg mt-3 border-0">
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
					<nav class="sb-sidenav accordion sb-sidenav-light bg-white border-end shadow-sm" id="sidenavAccordion">
						<div class="sb-sidenav-menu">
							<div class="nav pb-5 pt-4">
                                
                                <div class="sb-sidenav-menu-heading py-0">Main</div>

								<router-link class="nav-link" to="/m/home">
									<div class="sb-nav-link-icon"><i class="fas fa-columns fa-lg"></i></div>
									Dashboard
								</router-link>

								<div class="sb-sidenav-menu-heading">Interface</div>

								<a class="nav-link collapsed" data-bs-toggle="collapse" data-bs-target="#collapseStd" aria-expanded="false" aria-controls="collapseLayouts">
		                            <div class="sb-nav-link-icon"><i class="fas fa-users fa-lg"></i></div>
		                            Students
		                            <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
		                        </a>
		                        <div class="collapse" id="collapseStd" aria-labelledby="headingOne" data-parent="#sidenavAccordion">
		                            <nav class="sb-sidenav-menu-nested nav">
		                                <router-link class="nav-link" to="/m/students">All Students</router-link>
		                                <router-link class="nav-link" to="/m/students/add">Add Students</router-link>
		                            </nav>
		                        </div>							

								<a class="nav-link collapsed" data-bs-toggle="collapse" data-bs-target="#collapseStaff" aria-expanded="false" aria-controls="collapseLayouts">
		                            <div class="sb-nav-link-icon"><i class="fas fa-chalkboard-teacher fa-lg"></i></div>
		                            Staffs
		                            <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
		                        </a>
		                        <div class="collapse" id="collapseStaff" aria-labelledby="headingOne" data-parent="#sidenavAccordion">
		                            <nav class="sb-sidenav-menu-nested nav">
		                                <router-link class="nav-link" to="/m/staffs">All Staffs</router-link>
		                                <router-link class="nav-link" to="/m/staffs/add">Add Staff</router-link>
		                            </nav>
		                        </div>

								<a class="nav-link collapsed" data-bs-toggle="collapse" data-bs-target="#collapseG1" aria-expanded="false" aria-controls="collapseLayouts">
		                            <div class="sb-nav-link-icon"><i class="fas fa-users fa-lg"></i></div>
		                            Guardians
		                            <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
		                        </a>
		                        <div class="collapse" id="collapseG1" aria-labelledby="headingOne" data-parent="#sidenavAccordion">
		                            <nav class="sb-sidenav-menu-nested nav">
		                                <router-link class="nav-link" to="/m/guardians">All Guardians</router-link>
		                                <router-link class="nav-link" to="/m/guardians/add">Add Guardians</router-link>
		                            </nav>
		                        </div>


								<a class="nav-link collapsed" data-bs-toggle="collapse" data-bs-target="#collapseAcademics" aria-expanded="false" aria-controls="collapseLayouts">
		                            <div class="sb-nav-link-icon"><i class="fas fa-chalkboard-teacher fa-lg"></i></div>
		                            Academics
		                            <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
		                        </a>
		                        <div class="collapse" id="collapseAcademics" aria-labelledby="headingOne" data-parent="#sidenavAccordion">
		                            <nav class="sb-sidenav-menu-nested nav">
		                                <router-link class="nav-link" to="/m/subjects">Subjects</router-link>
		                                <router-link class="nav-link" to="/m/class">Class</router-link>
		                                <router-link class="nav-link" to="/m/fees/timetable">Timetable</router-link>
		                                <router-link class="nav-link" to="/m/fees/attendance">Gradebook</router-link>
		                                <router-link class="nav-link" to="/m/fees/attendance">Attendance</router-link>
		                            </nav>
		                        </div>


								<a class="nav-link collapsed" data-bs-toggle="collapse" data-bs-target="#collapseFee" aria-expanded="false" aria-controls="collapseLayouts">
		                            <div class="sb-nav-link-icon"><i class="fas fa-chalkboard-teacher fa-lg"></i></div>
		                            Bursary
		                            <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
		                        </a>
		                        <div class="collapse" id="collapseFee" aria-labelledby="headingOne" data-parent="#sidenavAccordion">
		                            <nav class="sb-sidenav-menu-nested nav">
		                                <router-link class="nav-link" to="/m/fees/overview">Overview</router-link>
		                                <router-link class="nav-link" to="/m/fees">Fees</router-link>
		                                <router-link class="nav-link" to="/m/fees/debtors">Debtors</router-link>
		                                <router-link class="nav-link" to="/m/fees/transactions">Transactions</router-link>
		                            </nav>
		                        </div>
								

								<div class="sb-sidenav-menu-heading">Teaching</div>

								<router-link class="nav-link" to="class">
									<div class="sb-nav-link-icon"><i class="fas fa-envelope fa-lg"></i></div>
									Mail center
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

	</div>
</template>

<script>
// components
import Snackbar from '@/components/Snackbar'

// library:vue
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import store from '@/store'

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

    	return {
           store
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
	  		User.logout().then(() => {
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

.shadow {
	box-shadow: 0 0.15rem .5rem 0 rgba(33, 40, 50, 0.15) !important;
}

.sb-sidenav-light .sb-sidenav-menu-nested {
	border-left: 1px solid #d4dae3
}
</style>