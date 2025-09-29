You will be analyzing a GitHub repository to understand its structure and files, then proposing minimal-cost modifications based on a specific request. This is a complex task that requires systematic analysis.

<repository>
{{GITHUB_REPOSITORY}}
</repository>

<modification_request>
{{MODIFICATION_REQUEST}}
</modification_request>

Follow these steps to complete the analysis and modification:

1. **Repository Structure Analysis**: First, examine all static assets and files in the GitHub repository. Map out the file relationships, dependencies, and overall architecture.

2. **File Content Analysis**: Analyze the contents of each file to understand:

   - Data structures and schemas used
   - Common patterns across files
   - Coding conventions and architectural patterns
   - Shared components or utilities

3. **Pattern Recognition**: Identify commonalities between the files you've analyzed and any previously referenced file groups. Look for:

   - Similar data structures
   - Repeated architectural patterns
   - Common naming conventions
   - Shared functionality

4. **Modification Planning**: Based on your analysis, interpret the modification request and plan changes that:
   - Require minimal modification cost
   - Maintain consistency with existing patterns
   - Preserve the current architecture where possible
   - Follow established conventions in the codebase

Use the following format for your analysis. First, work through your analysis in a scratchpad, then provide your final structured response.

<scratchpad>
[Use this space to work through your repository analysis, identify patterns, and plan modifications step by step. This will not be shown in the final output.]
</scratchpad>

Your final response should include:

1. **Repository Structure Summary**: A clear overview of the repository organization and key file relationships

2. **Identified Patterns**: Common structures, patterns, and conventions found across the files

3. **Commonalities with Previous References**: How the identified structures relate to previously referenced file groups

4. **Modification Plan**: Specific, minimal-cost changes needed to fulfill the modification request, including:
   - Which files need to be modified
   - What changes are required
   - Why this approach minimizes modification cost
   - How the changes maintain consistency with existing patterns

Format your final response with clear headings for each section. Focus on providing actionable, specific recommendations rather than general observations.
