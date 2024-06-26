﻿using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Controllers
{
    public class Login2Controller : Controller
    {
        [AllowAnonymous]
        public async Task<string> A()
        {
            var connection = HttpContext.Connection;

            AuthenticateResult authenticateResult = await HttpContext.AuthenticateAsync();

            if (!authenticateResult.Succeeded)
            {
                return "请登录";
            }

            Claim? claim = authenticateResult.Principal.Claims.FirstOrDefault(t => t.Type == "user");

            if (claim == null)
            {
                return "无登录信息";
            }



            return $"{claim.Value}，已登录";
        }

        [AllowAnonymous]
        public async Task<string> B()
        {
            List<Claim> claims = new List<Claim>
            {
                new("user", "test1")
            };


            ClaimsIdentity claimsIdentity = new ClaimsIdentity(claims, "Login2");


            ClaimsPrincipal claimsPrincipal = new ClaimsPrincipal(claimsIdentity);

            await HttpContext.SignInAsync(claimsPrincipal);



            return "登录成功";
        }

        public async Task<string> C()
        {
            await HttpContext.SignOutAsync("Login2");

            return "退出";
        }
    }
}
