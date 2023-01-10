import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Chat from './Chat'
import Main from './Main'

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Main />} />
    <Route path="/chat" element={<Chat />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
)

export default AppRoutes
