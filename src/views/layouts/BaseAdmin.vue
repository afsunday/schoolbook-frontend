<template>
	<div ref="body" class="sb-nav-fixed">
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
						<a class="dropdown-item small text-muted" href="profile">Profile</a>
						<a class="dropdown-item small text-muted" @click.prevent="logout" href="logout">Logout</a>
					</div>
				</li>
			</ul>
		</nav>
		<div id="layoutSidenav">
			<div id="layoutSidenav_nav">
				<nav class="sb-sidenav accordion sb-sidenav-dark shadow-sm" id="sidenavAccordion">
					<div class="sb-sidenav-menu">
						<div class="nav pb-5">

							<div class="sb-sidenav-menu-heading">Core</div>
							<router-link class="nav-link" to="/admin/home">
								<div class="sb-nav-link-icon"><i class="fas fa-columns fa-lg"></i></div>
								Home
							</router-link>

							<div class="sb-sidenav-menu-heading">Interface</div>

							<a class="nav-link collapsed" data-toggle="collapse" data-target="#collapseStudent" aria-expanded="false" aria-controls="collapseLayouts">
	                            <div class="sb-nav-link-icon"><i class="fas fa-users fa-lg"></i></div>
	                            Students
	                            <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
	                        </a>
	                        <div class="collapse" id="collapseStudent" aria-labelledby="headingOne" data-parent="#sidenavAccordion">
	                            <nav class="sb-sidenav-menu-nested nav">
	                                <router-link class="nav-link" to="/admin/students">All Students</router-link>
	                                <router-link class="nav-link" to="/admin/students/add">Add Students</router-link>
	                            </nav>
	                        </div>							

							<router-link class="nav-link" to="/admin/staffs">
							<div class="sb-nav-link-icon"><i class="fas fa-chalkboard-teacher fa-lg"></i></div>
								Staffs
							</router-link>

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

							<div class="sb-sidenav-menu-heading">Education</div>

							<router-link class="nav-link" to="/admin/subjects">
								<div class="sb-nav-link-icon"><i class="fas fa-swatchbook fa-lg"></i></div>
								Subjects
							</router-link>

							<router-link class="nav-link" to="/admin/class">
								<div class="sb-nav-link-icon"><i class="fas fa-list-alt fa-lg"></i></div>
								Class
							</router-link>

							<router-link class="nav-link" to="/admin/timetable">
								<div class="sb-nav-link-icon"><i class="fas fa-calendar-alt fa-lg"></i></div>
								Timetable
							</router-link>

							<router-link class="nav-link" to="/admin/class">
								<div class="sb-nav-link-icon"><i class="fas fa-chalkboard-teacher fa-lg"></i></div>
								Attendance
							</router-link>

							<router-link class="nav-link" to="/admin/mail">
								<div class="sb-nav-link-icon"><i class="fas fa-envelope fa-lg"></i></div>
								Mail center
							</router-link>

							<div class="sb-sidenav-menu-heading">Fee Management</div>

							<router-link class="nav-link" to="/admin/class">
								<div class="sb-nav-link-icon"><i class="fab fa-dashcube fa-lg"></i></div>
								Overview
							</router-link>

							<router-link class="nav-link" to="/admin/fees">
								<div class="sb-nav-link-icon"><i class="fas fa-swatchbook fa-lg"></i></div>
								Fees
							</router-link>

							<router-link class="nav-link" to="/admin/class">
								<div class="sb-nav-link-icon"><i class="fas fa-list-alt fa-lg"></i></div>
								Debtors
							</router-link>

							<router-link class="nav-link" to="/admin/class">
								<div class="sb-nav-link-icon"><i class="fas fa-chalkboard-teacher fa-lg"></i></div>
								Transactions
							</router-link>

							<router-link class="nav-link" to="class">
								<div class="sb-nav-link-icon"><i class="fas fa-envelope fa-lg"></i></div>
								Mail center
							</router-link>

							<div class="sb-sidenav-menu-heading">Teaching</div>

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
			<div @click="skinNavToggle()" id="layoutSidenav_content">
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
</template>

<script>
import Snackbar from '@/components/Snackbar'
import User from '@/apis/User'

export default {
    name: 'BaseAdmin',
    components: {
    	Snackbar
    },
    
    data () {
	    return {
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
@import '@/assets/scss/themeone'
</style>