import firebase from "firebase"

const firebaseConfig = {
	apiKey: "AIzaSyCcS7GCewNpU0RC6KESR2TKZo943n7tP4M",
	authDomain: "optibus-51e7c.firebaseapp.com",
	databaseURL: "https://optibus-51e7c-default-rtdb.firebaseio.com",
	projectId: "optibus-51e7c",
	storageBucket: "optibus-51e7c.appspot.com",
	messagingSenderId: "61078478291",
	appId: "1:61078478291:web:6ab352d5ea8c317211a326",
}

firebase.initializeApp(firebaseConfig)
const database = firebase.database()

export const assignedLiveData = {
	_liveDataRef: database.app.database().ref("assigned"),

	get(): Promise<Record<string, string>> {
		return new Promise((resolve, reject) => {
			this._liveDataRef.get().then((assigned) => resolve(assigned.val() || {}))
		})
	},

	set(assigned: Record<string, string>) {
		this._liveDataRef.set(assigned)
	},

	on(callback: (data: Record<string, string>) => unknown) {
		this._liveDataRef.on("value", (snapshot) => {
			callback(snapshot.val() || {})
		})
	},
}
