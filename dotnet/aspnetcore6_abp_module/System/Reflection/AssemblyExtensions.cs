﻿using System.Diagnostics;

namespace System.Reflection
{
    public static class AssemblyExtensions
    {
        public static string GetFileVersion(this Assembly assembly)
        {
            return FileVersionInfo.GetVersionInfo(assembly.Location).FileVersion;
        }
    }
}
