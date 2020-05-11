import * as axios from 'axios'

const token = localStorage.getItem("token")

const instance = axios.create({
    baseURL: "http://localhost:3000/",
})


const withToken = axios.create({
    baseURL: "http://localhost:3000/",
    headers: {
        "Authorization": "Bearer " + token
    }
})

export const authAPI = {
    me(token) {
      return instance.get("api/auth/me", {
          headers: {Authorization: "Bearer " + token}
      })
    },
    login(email, password) {
        return instance.post("api/auth/login", {email, password})
    },
    register(email, password) {
        return instance.post("api/auth/register", {email, password})
    }
}

export const questionsAPI = {
    postQuestion(title, text) {
        return withToken.post("/api/questions/generate", {title, text})
    },
    deleteQuestion(id) {
      return withToken.delete(`/api/questions/${id}`)
    },
    getQuestions() {
        return instance.get("/api/questions")
    },
    getQuestion(id) {
        return instance.get(`api/questions/${id}`);
    }
}