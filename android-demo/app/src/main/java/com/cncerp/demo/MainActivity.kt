package com.cncerp.demo

import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.cncerp.demo.databinding.ActivityMainBinding

class MainActivity : AppCompatActivity() {
    private lateinit var binding: ActivityMainBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(getLayoutInflater())
        setContentView(binding.root)

        binding.btnLogin.setOnClickListener {
            val username = binding.etUsername.text.toString()
            if (username.isNotEmpty()) {
                Toast.makeText(this, "登录成功！欢迎 $username", Toast.LENGTH_SHORT).show()
            } else {
                Toast.makeText(this, "请输入用户名", Toast.LENGTH_SHORT).show()
            }
        }
    }
}